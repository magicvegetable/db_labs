import { PATHS } from './table-services.js';
import db_service from './db.js';

export default async function Controller(fastify, options) {
    for (const [path, Service] of Object.entries(PATHS)) {
        const service = await Service.new_setuped(db_service);
        fastify.get(`/${path}`, {
                schema: {
                    querystring: {
                        type: 'object',
                        properties: {
                            id: { type: 'integer' } // Define the type of the 'id' parameter as needed
                        }
                    }
                }
            },
            async (req, rep) => {
                const id = parseInt(req?.query.id);

                const res = id ?
                    await service.readAll({ id })
                    : await service.readAll();

                rep.code(res.code);
                delete res.code;
                return res;
            }
        );

        fastify.get(`/${path}/:id`, async function (req, rep) {
            const id = parseInt(req.params.id);
            
            const res = await service.readAll({ id });

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.post(`/${path}`, async (req, rep) => {
            const body = req.body;
            const res = await service.create(req.body);

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.post(`/${path}/:id`, async function (req, rep) {
            const body = Object.assign({}, req.body);
            body.id = parseInt(req.params.id);

            const res = await service.createID(body);

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.put(`/${path}`, async (req, rep) => {
            const body = req.body;
            const res = await service.update(req.body);

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.put(`/${path}/:id`, async (req, rep) => {
            const body = req.body;
            body.id = parseInt(req.params.id);
            const res = await service.updateID(body);

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.delete(`/${path}`, async (req, rep) => {
            const body = req.body;
            const res = await service.deleteAll(req.body);

            rep.code(res.code);
            delete res.code;
            return res;
        });

        fastify.delete(`/${path}/:id`, async (req, rep) => {
            const id = parseInt(req.params.id);
            const res = await service.deleteAll({ id });

            rep.code(res.code);
            delete res.code;
            return res;
        });
    }

}

