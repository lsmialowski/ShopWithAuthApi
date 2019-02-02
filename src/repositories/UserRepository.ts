import {EntityRepository, Repository} from 'typeorm';
import User from '../models/User';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

  public async checkIfExist(email: string): Promise<boolean> {
      return !!(await this.findOne({email}));
  }

}
