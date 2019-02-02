import * as config from 'nconf';
import {Container} from 'typedi';
import {Logger} from 'winston';
import application from './app/app';

(async () => {
    const app = await application();

    const PORT = config.get('port') || 3000;

    app.listen(PORT, () => {
        const logger = Container.get<Logger>('logger');
        logger.info('Express server listening on port ' + PORT);
    });
})();
