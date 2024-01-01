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

