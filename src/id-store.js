class Range {
    constructor(range) {
        this.min = range?.min ?? 1;
        this.max = range?.max ?? Number.MAX_SAFE_INTEGER;
    } 
}

export default class IDStore {
    store = [new Range()];

    get free_id() {
        // no free ids left
        if (!this.store.length) return 0;

        const range = this.store[0];
        const id = range.min;
        if (range.min++ === range.max) this.store.shift();
        return id;
    }

    set free_id(id) {
        const prev = new Range({ max: Number.MIN_SAFE_INTEGER });

        for (let i = 0; i < this.store.length; i++) {
            const cur = this.store[i];
            if (cur.min - 1 === id) cur.min--;
            if (cur.max + 1 === id) cur.max++;

            if (prev.max === cur.min) {
                this.store.splice(i - 1, 2, new Range({
                    min: prev.min,
                    cur: cur.max
                }));
                break;
            }

            if (prev.max < id && cur.min > id) {
                this.store.splice(i - 1, 0, new Range({ min: id, max: id }));
                break;
            }

            Object.assign(prev, cur);
        }
    }

    static async setup({ service, table, id_store }) {
        const [ids] = await service.read({ table: table, data: ['id'] });

        const store = id_store.store;
        for (const { id } of ids) {
            const last = store[store.length - 1];
            const { min, max } = last;
            if (id > min && id < max) {
                last.max = id - 1;
                const next_last = new Range({ min: id + 1, max });
                store.push(next_last);
            } else if (id === min && id === max) {
                store.pop();
            } else if (id === min) {
                last.min++;
            } else if (id === max) {
                last.max--;
            }
        }
    }
}
