import * as fs from 'node:fs';

import * as mysql from 'mysql2/promise';

const SQL_COMMANDS = fs
    .readFileSync('db.sql', 'utf8') // get all sql
    .replace(/-- .*/g, '') // remove comments
    .replace(/^\n/gm, '') // remove empty lines
    .match(/^[^;]+;$/gm); // match command + remove empty commands

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Lkopksls1',
    database: 'opinio'
});

await connection.connect();

class DBService {
    constructor(connection) {
        this.connection = connection;
    }

    async init(commands) {
        for (const command of commands) {
            await this.connection.query(command);
        }
    }

    async create({ table, data }) {
        const req = `INSERT INTO ${table} SET ?`;
        const res = await this.connection.query(req, data);
        return res;
    }

    async read({ table, data }) {
        const req = `SELECT ${data && data.length ? data.join(', ') : '*'} FROM ${table}`;
        const res = await this.connection.query(req);
        return res;
    }

    async update({ table, data }) {
        const req = `UPDATE ${table} SET ? WHERE id = ?`;
        const res = await this.connection.query(req, [data, data.id]);
    }

    async delete({ table, data }) {
        const req = `DELETE FROM ${table} WHERE ?`;
        const res = await this.connection.query(req, { id: data.id });
        return res;
    }

    async find({ table, data }) {
        if (!Object.values(data).length) return await this.read({ table, data: [] });

        const where = Object.entries(data)
            .map(([key, value]) => {
                const vl_str = typeof value === 'string' ?
                    `'${value}'` : `${value}`;
                return `${key} = ${vl_str}`
            })
            .join(' && ');

        const req = `SELECT * FROM ${table} WHERE ${where}`;
        const res = await this.connection.query(req);
        return res;
    }
}

const db_service = new DBService(connection);
await db_service.init(SQL_COMMANDS);

export default db_service;

