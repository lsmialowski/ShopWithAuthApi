import * as config from 'nconf';
import {Container} from 'typedi';
import * as logger from 'winston';
import {Logger} from 'winston';

export default () => {
    const winston: Logger = logger.createLogger({
        level: config.get('winston:level'),
        format: logger.format.prettyPrint(),
        transports: [
            new logger.transports.File({filename: './data/error.log'}),
            new logger.transports.Console({format: logger.format.cli()}),
        ],
    });

    Container.set('logger', winston);
};
