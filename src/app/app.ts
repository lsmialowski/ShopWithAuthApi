import bodyParser = require('body-parser');
import * as express from 'express';
import 'reflect-metadata';
import {useContainer as routingUseContainer, useExpressServer, Action} from 'routing-controllers';
import {Container as typeDiContainer} from 'typedi';
import {useContainer as ormUseContainer} from 'typeorm';
import ErrorHandler from '../common/error/ErrorHandler';
import config from './config';
import database from './database';
import logger from './logger';

export default async (): Promise<express.Application> => {
    /** config init */
    config();

    /** loggerInit init */
    logger();

    /** Tells TypeOrm to use TypeDI Container (Required!)
     *
     * https://github.com/typestack/typedi#troubleshooting
     */
    ormUseContainer(typeDiContainer);

    /** Database init
     *
     * Makes sure that errors are handled correctly, because middleware isn't initialized yet
     */
    await database().catch((error: any) => typeDiContainer.get(ErrorHandler).handle(error));

    const app = express();

    /** Tells Routing Controllers to use TypeDI Container (Required!)
     *
     * https://github.com/typestack/typedi#troubleshooting
     */
    routingUseContainer(typeDiContainer);

    app.use(bodyParser.json());

    /** Making sure that even if someone won't .catch() promise, that error it will be handled */
    process.on('unhandledRejection', error => {
        typeDiContainer.get(ErrorHandler).handle(error);
    });

    return useExpressServer(app, {
        routePrefix: '/api/v1',
        controllers: [__dirname + '/../controllers/*.js'],
        middlewares: [__dirname + '/../middlewares/*.js'],
        development: false,
        currentUserChecker: async (action: Action) => {
            return action.request.user;
        },
    });
};
