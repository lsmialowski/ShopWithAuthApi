import * as config from 'nconf';

export default () => {
    config.argv().env({lowerCase: true});
    const environment = config.get('NODE_ENV') || 'development';
    config.file(environment, {file: `./config/${environment}.json`});
    config.file('default', {file: './config/default.json'});
};
