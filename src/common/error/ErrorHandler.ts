import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import logger from '../../app/logger';

@Service()
export default class ErrorHandler {

  @Inject('logger')
  private logger: Logger;

  public handle(error: any) {
    this.logger.error(JSON.stringify(error));
    this.crash(error);
  }

  private crash(error: any) {
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
     this.logger.info('Gracefully shutting down');
     process.exit(1);
    }
  }
}
