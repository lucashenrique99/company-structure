import { ErrorHandler, Inject, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

    constructor( ) { }

    handleError(error: Error) {
        let message;
        if (error instanceof Error) {
            message = `Error: ${error.name}\n Description: ${error.message}\n Stack: ${this.getStack(error)}`;
        } else if (typeof (error) === 'object') {
            try {
                message = JSON.stringify(error);
            } catch (e) {
                message = error;
            }
        } else {
            message = error;
        }
        console.log(message)
        console.log(error)
    }
    
    getStack(error: Error): string {
        if (error.stack) {
            return error.stack.length > 100 ? error.stack?.substr(0, 100) : error.stack;
        }
        return '';
    }

} 
