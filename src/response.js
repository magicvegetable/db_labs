export default class Response {
    constructor({ code, message, data, status }) {
        this.status = status;
        this.message = message;
        this.data = data;
        this.code = code;
    }
}
