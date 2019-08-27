import * as os from 'os';
import { StateConstant } from './constants/state';
import { ITracebackPrinter } from './interfaces/ITracebackPrinter';

class BaseException extends Error {
    private _innerException: BaseException

    constructor(
        message: string = undefined,
        innerException: BaseException = undefined
    ) {
        super();
        this._innerException = innerException ? innerException : undefined;
        super.message = message ? message : "";
    }

    public GetInnerException(): BaseException {
        return this._innerException;
    }

    public GetTraceback(): Array<string> {
        let errorMessages: Array<string> = [this.message];
        let innerException: BaseException  = this._innerException;
        while (innerException !== undefined) {
            errorMessages.push(innerException.message);
            innerException = innerException._innerException;
        }
        return errorMessages;
    }

    public PrintTraceback(printer: ITracebackPrinter): void {
        const traceback: Array<string> = this.GetTraceback();
        for (let i = 0; i < traceback.length; i++) {
            const prefix: string = " ".repeat(i * 2);
            printer(`${prefix}${traceback[i]}`);
        }
    }
}

export class NotImplementedException extends BaseException {
}

export class UnexpectedExitException extends BaseException {
    constructor(state: StateConstant = StateConstant.Neutral) {
        super(StateConstant[state]);
    }
}

export class ExecutionException extends BaseException {
    constructor(state: StateConstant, executionStage?: string, innerException?: BaseException) {
        let errorMessage = `Execution Exception (state: ${StateConstant[state]})`
        if (executionStage !== undefined) {
            errorMessage += ` (step: ${executionStage})`
        }
        super(errorMessage, innerException);
    }
}

export class InvocationException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "Invocation", innerException);
    }
}

export class ChangeParamsException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "ChangeParams", innerException);
    }
}

export class ChangeContextException extends ExecutionException {
    constructor(state: StateConstant, innerException?: BaseException) {
        super(state, "ChangeContext", innerException);
    }
}

export class ValidationError extends BaseException {
    constructor(state: StateConstant, field: string, expectation: string) {
        super(`At ${StateConstant[state]}, ${field} : ${expectation}.`);
    }
}