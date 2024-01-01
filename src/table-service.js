import IDStore from './id-store.js';
import Response from './response.js';

export default class TableService {
    constructor({ service, table, keys, Item, checks }) {
        this.service = service;
        this.table = table;
        this.keys = keys;
        this.Item = Item;
        this.checks = checks;
    }

    id_store = new IDStore();

    async create(data) {
        if (typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        const item = new this.Item();
        for (const [key, type] of Object.entries(this.keys.requied)) {
            if (!(key in data))
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `no ${key} has given`,
                    data: data
                });
            if (typeof data[key] !== type)
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `typeof ${key} !== ${type}`,
                    data: data
                });
            item[key] = data[key];
        }

        for (const [key, type] of Object.entries(this.keys.optional ?? {})) {
            if (key in data) {
                if (typeof data[key] !== type)
                    return new Response({
                        code: 404,
                        status: 'failed',
                        message: `typeof ${key} !== ${type}`,
                        data: data
                    });
                item[key] = data[key];
            }
        }

        for (const [key, check] of Object.entries(this?.checks.create ?? {})) {
            const valid = await check([item[key]]);
            if (!valid)
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `invalid value of ${key}`,
                    data: data
                });
        }

        item.id = this.id_store.free_id;

        if(!item.id)
            return Response({
                code: 200,
                status: 'failed',
                message: 'no free item',
                data: data
        });

        const res = await this.service.create({ table: this.table, data: item });
        return new Response({
            code: 200,
            status: 'succeess',
            message: 'item successfully added',
            data: item
        });
    }

    async createID(data) {
        if (typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        if (!('id' in data) || typeof data.id !== 'number' || data.id <= 0)
            return new Response({
                code: 404,
                status: 'failed',
                message: `no id has given`,
                data: data
            });

        const item = new this.Item();
        for (const [key, type] of Object.entries(this.keys.requied)) {
            if (!(key in data))
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `no ${key} has given`,
                    data: data
                });
            if (typeof data[key] !== type)
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `typeof ${key} !== ${type}`,
                    data: data
                });
            item[key] = data[key];
        }

        for (const [key, type] of Object.entries(this.keys.optional ?? {})) {
            if (key in data) {
                if (typeof data[key] !== type)
                    return new Response({
                        code: 404,
                        status: 'failed',
                        message: `typeof ${key} !== ${type}`,
                        data: data
                    });
                item[key] = data[key];
            }
        }

        for (const [key, check] of Object.entries(this?.checks.create ?? {})) {
            const valid = await check([item[key]]);
            if (!valid)
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `invalid value of ${key}`,
                    data: data
                });
        }

        item.id = data.id;

        const [[finded]] = await this.service.find({ table: this.table, data: { id: data.id } });
        if (!finded) { 
            await this.service.create({ table: this.table, data: item });
        } else {
            await this.service.update({ table: this.table, data: item });
            return new Response({
                code: 200,
                status: 'succeess',
                message: 'item successfully updated',
                data: item
            });

        }

        return new Response({
            code: 200,
            status: 'succeess',
            message: 'item successfully added',
            data: item
        });
    }

    async updateID(data) {
        if (typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        if (!('id' in data) || typeof data.id !== 'number' || data.id <= 0)
            return new Response({
                code: 404,
                status: 'failed',
                message: `no id has given`,
                data: data
            });

        const [[finded]] = await this.service.find({ table: this.table, data: { id: data.id } });
        if (!finded)
            return new Response({
                code: 404,
                status: 'failed',
                message: `item with id = ${data.id} doesn't exist`,
                data: data
            });

        for (const [key, check] of Object.entries(this?.checks.update ?? {})) {
            if (key in data && data[key] !== finded[key]) {
                const valid = await check([data[key]]);
                if (!valid)
                    return new Response({
                        code: 404,
                        status: 'failed',
                        message: `invalid value of ${key}`,
                        data: data
                    });
            }
        }

        for (const key of Object.keys(this.keys.requied)) {
            if (key in data) finded[key] = data[key];
        }

        for (const key of Object.keys(this.keys.optional ?? {})) {
            if (key in data) finded[key] = data[key];
        }

        const res = await this.service.update({ table: this.table, data: finded });
        return new Response({
            code: 200,
            status: 'succeess',
            message: 'item successfully updated',
            data: finded
        });
    }

    async update(data) {
        if (typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        for (const key of Object.keys(this.keys.requied)) {
            if (!(key in data.current))
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `no ${key} has given`,
                    data: data.current
                });
            if (!(key in data.future))
                return new Response({
                    code: 404,
                    status: 'failed',
                    message: `no ${key} has given`,
                    data: data.future
                });
        }

        const [[finded]] = await this.service.find({ table: this.table, data: data.current });
        if (!finded)
            return new Response({
                code: 404,
                status: 'failed',
                message: 'item doesn\'t exist',
                data: data.current
            });

        for (const [key, check] of Object.entries(this?.checks.update ?? {})) {
            if (key in data.future && data.future[key] !== finded[key]) {
                const valid = await check([data.future[key]]);
                if (!valid)
                    return new Response({
                        code: 404,
                        status: 'failed',
                        message: `invalid value of ${key}`,
                        data: data
                    });
            }
        }

        const future = new this.Item();

        Object.assign(future, { id: finded.id });
        Object.assign(future, data.future);
        this.service.update({ table: this.table, data: future })

        return new Response({
            code: 200,
            status: 'succeess',
            message: 'item successfully updated',
            data: future
        });
    }

    async readAll(data) {
        if (data && typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        const item = {};
        if (data) {
            for (const [key, type] of Object.entries(this.keys.requied)) {
                if (key in data && typeof data[key] === type) item[key] = data[key];
            }
            for (const [key, type] of Object.entries(this.keys.optional ?? {})) {
                if (key in data && typeof data[key] === type) item[key] = data[key];
            }
            if ('id' in data) item.id = data.id;
        }

        const [finded] = await this.service.find({ table: this.table, data: item });
        if (!finded.length) 
            return new Response({
                code: 200,
                status: 'success',
                message: 'no matches',
                data: finded
            });
        if (!data?.cols || Array.isArray(data.cols) || !data.cols.length)
            return new Response({
                code: 200,
                status: 'success',
                message: 'find matches',
                data: finded
            });

        const res = [];
        for (const el of finded) {
            const res_el = {};
            for (const col of data.cols) {
                if (col in el) res_el[col] = el[col];
            }
            res.push(res_el);
        }

        return new Response({
            code: 200,
            status: 'succeess',
            message: 'item successfully deleted',
            data: res
        });
    }

    async deleteAll(data) {
        if (data && typeof data !== 'object')
            return new Response({
                code: 404,
                status: 'failed',
                message: 'typeof data !== \'object\'',
                data: data
            });

        const item = {};
        if (data) {
            for (const [key, type] of Object.entries(this.keys.requied)) {
                if (key in data && typeof data[key] === type) item[key] = data[key];
            }

            for (const [key, type] of Object.entries(this.keys.optional ?? {})) {
                if (key in data && typeof data[key] === type) item[key] = data[key];
            }
            if ('id' in data) item.id = data.id;
        }

        const [finded] = await this.service.find({ table: this.table, data: item });
        if (!finded.length) 
            return new Response({
                code: 200,
                status: 'success',
                message: 'no matches',
                data: data
            });

        for (const el of finded) await this.service.delete({ table: this.table, data: el });
        return new Response({
            code: 200,
            status: 'succeess',
            message: 'all items successfully deleted',
            data: finded
        });
    }

    static async new_setuped(service) {
        const table_service = new this(service);
        await IDStore.setup({
            service: service,
            table: table_service.table,
            id_store: table_service.id_store
        });

        return table_service;
    }
}
