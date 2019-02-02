import * as nconf from 'nconf';
import {createConnection, Connection} from 'typeorm';
import {MysqlConnectionOptions} from 'typeorm/driver/mysql/MysqlConnectionOptions';

export default async (): Promise<Connection> => {
  const config: MysqlConnectionOptions =  nconf.get('database');

  return createConnection({
    type: config.type,
    host: config.host,
    port: config.port,
    username: config.username,
    password: config.password,
    database: config.database,
    charset: config.charset,
    entities: [__dirname + '/../models/*.js'],
  });
};
