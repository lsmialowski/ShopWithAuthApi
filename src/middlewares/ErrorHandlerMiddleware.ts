import {ExpressErrorMiddlewareInterface, Middleware} from 'routing-controllers';
import { Inject } from 'typedi';
import ErrorHandler from '../common/error/ErrorHandler';

@Middleware({type: 'after'})
export class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {

    @Inject()
    private errorHandler: ErrorHandler;

    public error(error: any, request: Express.Request, response: Express.Response, next: (err?: any) => any) {
        this.errorHandler.handle(error);
    }
}
