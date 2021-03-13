export abstract class CustomError extends Error {
    abstract statusCode: number;
    abstract serializeError(): { message: String, field?: String }[]

    constructor(message: string) {
        super(message);

        Object.setPrototypeOf(this, CustomError.prototype);
    }
}