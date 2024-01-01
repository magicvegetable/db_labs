# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення на початкового наповнення бази даних

``` sql
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema opinio
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `opinio` ;

-- -----------------------------------------------------
-- Schema opinio
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `opinio` DEFAULT CHARACTER SET utf8 ;
USE `opinio` ;

-- -----------------------------------------------------
-- Table `opinio`.`Poll`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Poll` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Poll` (
  `id` INT NOT NULL,
  `title` MEDIUMTEXT NOT NULL,
  `description` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Question`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Question` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Question` (
  `id` INT NOT NULL,
  `type` MEDIUMTEXT NOT NULL,
  `text` LONGTEXT NOT NULL,
  `Poll_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`),
  INDEX `fk_Question_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_Question_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Answer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Answer` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Answer` (
  `id` INT NOT NULL,
  `field` BLOB NOT NULL,
  `Question_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Question_id`),
  INDEX `fk_Answer_Question_idx` (`Question_id` ASC) VISIBLE,
  CONSTRAINT `fk_Answer_Question`
    FOREIGN KEY (`Question_id`)
    REFERENCES `opinio`.`Question` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Role` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Role` (
  `id` INT NOT NULL,
  `name` TINYTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`User`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`User` ;

CREATE TABLE IF NOT EXISTS `opinio`.`User` (
  `id` INT NOT NULL,
  `mail` MEDIUMTEXT NOT NULL,
  `password` MEDIUMTEXT NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  `age` INT NULL,
  `gender` MEDIUMTEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Grant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Grant` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Grant` (
  `id` INT ZEROFILL NOT NULL,
  `assignedAt` DATE NOT NULL,
  `Role_id` INT NOT NULL,
  `User_id` INT NOT NULL,
  `Answer_id` INT NULL,
  `Answer_Question_id` INT NULL,
  `Poll_id` INT NULL,
  PRIMARY KEY (`id`, `Role_id`, `User_id`),
  INDEX `fk_Grant_Role1_idx` (`Role_id` ASC) VISIBLE,
  INDEX `fk_Grant_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Grant_Answer1_idx` (`Answer_id` ASC, `Answer_Question_id` ASC) VISIBLE,
  INDEX `fk_Grant_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_Grant_Role1`
    FOREIGN KEY (`Role_id`)
    REFERENCES `opinio`.`Role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_Answer1`
    FOREIGN KEY (`Answer_id` , `Answer_Question_id`)
    REFERENCES `opinio`.`Answer` (`id` , `Question_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Grant_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`State`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`State` ;

CREATE TABLE IF NOT EXISTS `opinio`.`State` (
  `id` INT NOT NULL,
  `text` LONGTEXT NOT NULL,
  `type` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Action`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Action` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Action` (
  `id` INT NOT NULL,
  `date` DATE NOT NULL,
  `Poll_id` INT NOT NULL,
  `Grant_id` INT ZEROFILL NOT NULL,
  `State_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Poll_id`, `Grant_id`, `State_id`),
  INDEX `fk_Action_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  INDEX `fk_Action_Grant1_idx` (`Grant_id` ASC) VISIBLE,
  INDEX `fk_Action_State1_idx` (`State_id` ASC) VISIBLE,
  CONSTRAINT `fk_Action_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Action_Grant1`
    FOREIGN KEY (`Grant_id`)
    REFERENCES `opinio`.`Grant` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Action_State1`
    FOREIGN KEY (`State_id`)
    REFERENCES `opinio`.`State` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Specialty`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Specialty` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Specialty` (
  `id` INT NOT NULL,
  `name` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`Qualification`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`Qualification` ;

CREATE TABLE IF NOT EXISTS `opinio`.`Qualification` (
  `id` INT NOT NULL,
  `level` INT NOT NULL,
  `User_id` INT NOT NULL,
  `Specialty_id` INT NOT NULL,
  PRIMARY KEY (`id`, `User_id`, `Specialty_id`),
  INDEX `fk_Qualification_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_Qualification_Specialty1_idx` (`Specialty_id` ASC) VISIBLE,
  CONSTRAINT `fk_Qualification_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Qualification_Specialty1`
    FOREIGN KEY (`Specialty_id`)
    REFERENCES `opinio`.`Specialty` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `opinio`.`EarnedMoney`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `opinio`.`EarnedMoney` ;

CREATE TABLE IF NOT EXISTS `opinio`.`EarnedMoney` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NOT NULL,
  `amount` INT NOT NULL,
  `tookAway` TINYINT NOT NULL,
  `User_id` INT NOT NULL,
  `Poll_id` INT NOT NULL,
  PRIMARY KEY (`id`, `User_id`, `Poll_id`),
  INDEX `fk_EarnedMoney_User1_idx` (`User_id` ASC) VISIBLE,
  INDEX `fk_EarnedMoney_Poll1_idx` (`Poll_id` ASC) VISIBLE,
  CONSTRAINT `fk_EarnedMoney_User1`
    FOREIGN KEY (`User_id`)
    REFERENCES `opinio`.`User` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_EarnedMoney_Poll1`
    FOREIGN KEY (`Poll_id`)
    REFERENCES `opinio`.`Poll` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними

### Головний файл (src/server.js)
```js
import Fastify from 'fastify';

import Controller from './controller.js'

const fastify = Fastify({ logger: true });

fastify.register(Controller)

try {
    await fastify.listen({ port: 3000 });
} catch (err) {
    fastify.log.error(err);
    process.exit(1);
}
```

### Файл з підключенням до бази даних (src/db.js)
```js
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
    password: 'your password',
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

```

### Файл з контролером (src/controller.js)
```js
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
```

### Файл з сутностями (src/table-services.js)
```js
import { Blob } from 'node:buffer';

import TableService from './table-service.js';

class User {
    id = 0;
    mail = '';
    password = '';
    name = '';
    age = 0;
    gender = '';
    earnedMoney = 0;
};

export class UserService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`User`',
            keys: {
                requied: {
                    mail: 'string',
                    password: 'string',
                    name: 'string'
                },
                optional: {
                    age: 'number',
                    gender: 'string',
                    earnedMoney: 'number'
                }
            },
            Item: User,
            checks: {
                create: {
                    mail: async (mail) => {
                        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mail)) return false;
                        const [[finded]] = await service.find({ table: '`User`', data: { mail: '' + mail }}); // Server error without ''
                        return !finded;
                    },
                    name: async (name) => {
                        const [[finded]] = await service.find({ table: '`User`', data: { name: '' + name }}); // Server error without ''
                        return !finded;
                    }
                },
                update: {
                    mail: async (mail) => {
                        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(mail)) return false;
                        const [[finded]] = await service.find({ table: '`User`', data: { mail: '' + mail }}); // Server error without ''
                        return !finded;
                    },
                    name: async (name) => {
                        const [[finded]] = await service.find({ table: '`User`', data: { name: '' + name }}); // Server error without ''
                        return !finded;
                    }
                }
            }
        });
    }
};

class Role {
    id = 0;
    name = '';
};

export class RoleService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Role`',
            keys: {
                requied: {
                    name: 'string'
                }
            },
            Item: Role
        });
    }
};

class Poll {
    id = 0;
    title = '';
    description = '';
    Grant_id = 0;
};

export class PollService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Poll`',
            keys: {
                requied: {
                    title: 'string',
                    description: 'string',
                    Grant_id: 'number'
                }
            },
            Item: Poll,
            checks: {
                create: {
                    Grant_id: async (Grant_id) => {
                        const [[finded]] = await service.find({ table: '`User`', data: { Grant_id: '' + Grant_id }}); // Server error without ''
                        return !finded;
                    }
                },
                update: {
                    Grant_id: async (Grant_id) => {
                        const [[finded]] = await service.find({ table: '`User`', data: { Grant_id: '' + Grant_id }}); // Server error without ''
                        return !finded;
                    }
                }
            }
        });
    }
};

class Grant {
    id = 0;
    assignedAt = '';
    Role_id = 0;
    User_id = 0;
};

export class GrantService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Grant`',
            keys: {
                requied: {
                    assignedAt: 'string',
                    Role_id: 'number',
                    User_id: 'number'
                }
            },
            Item: Grant
        });
    }
};

class Question {
    id = 0;
    type = '';
    text = '';
    Poll_id = 0;
};

export class QuestionService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Question`',
            keys: {
                requied: {
                    type: 'string',
                    text: 'string',
                    Poll_id: 'number'
                }
            },
            Item: Question
        });
    }
};

class Answer {
    id = 0;
    field = new Blob();
    Question_id = 0;
    Grant_id = 0;
};

export class AnswerService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Answer`',
            keys: {
                requied: {
                    field: typeof Blob,
                    Question_id: 'number',
                    Grant_id: 'number'
                }
            },
            Item: Answer,
            checks: {
                create: {
                    field: async (blob) => blob instanceof Blob
                },
                update: {
                    field: async (blob) => blob instanceof Blob
                },
            }
        });
    }
};

class State {
    id = 0;
    text = '';
    type = '';
};

export class StateService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`State`',
            keys: {
                requied: {
                    text: 'string',
                    type: 'string'
                }
            }
        });
    }
};

class Action {
    id = 0;
    date = new Date();
    Poll_id = 0;
    Poll_Grant_id = 0;
    Grant_id = 0;
    State_id = 0;
};

export class ActionService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Action`',
            keys: {
                requied: {
                    date: typeof Date,
                    Poll_id: 'number',
                    Poll_Grant_id: 'number',
                    Grant_id: 'number',
                    State_id: 'number'
                }
            },
            checks: {
                create: {
                    date: async (date) => date instanceof Date
                },
                update: {
                    date: async (date) => date instanceof Date
                },
            }
        });
    }
};

class Specialty {
    id = 0;
    name = '';
};

export class SpecialtyService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Specialty`',
            keys: {
                requied: {
                    name: 'string'
                }
            }
        });
    }
};

class Qualification {
    id = 0;
    level = 0;
    User_id = 0;
    Specialty_id = 0;
};

export class QualificationService extends TableService {
    constructor(service) {
        super({
            service,
            table: '`Qualification`',
            keys: {
                requied: {
                    level: 'number',
                    User_id: 'number',
                    Specialty_id: 'number'
                }
            }
        });
    }
};

export const PATHS = {
    'user': UserService,
    'role': RoleService,
    'poll': PollService,
    'grant': GrantService,
    'question': QuestionService,
    'answer': AnswerService,
    'state': StateService,
    'action': ActionService,
    'specialty': SpecialtyService,
    'qualification': QualificationService
};

```

### Файл з базовим класом сутностей (src/table-service.js)
```js
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

```

### Файл з класом для регулювання id таблиць (src/id-store.js)
```js
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

```

### Файл з базовим класом Response (src/response.js)
```js
export default class Response {
    constructor({ code, message, data, status }) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.code = code;
    }
}
```

