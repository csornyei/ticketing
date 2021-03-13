import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
    statusCode = 400;
    constructor(private errors: ValidationError[]) {
        super('Validation error');

        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }

    public serializeError() {
        return this.errors.map(error => {
            return { message: error.msg, field: error.param };
        });
    }
}