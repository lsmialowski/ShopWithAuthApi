import {ExpressMiddlewareInterface, UnauthorizedError} from 'routing-controllers';
import {Repository} from 'typeorm';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {decodeAndValidateToken, getToken} from '../common/authorization/auth.util';
import InvalidToken from '../models/InvalidToken';
import UserRepository from '../repositories/UserRepository';

export class AuthMiddleware implements ExpressMiddlewareInterface {

    @InjectRepository()
    private readonly userRepository: UserRepository;

    @InjectRepository(InvalidToken)
    private readonly invalidTokensRepository: Repository<InvalidToken>;

    public async use(request: any, response: any, next: any) {
        if (!request.headers['authorization']) {
            throw new UnauthorizedError();
        }
        const token = getToken(request.headers['authorization']);

        const decodedToken: any = decodeAndValidateToken(token);

        const isTokenBlocked = !!(await this.invalidTokensRepository.findOne({where: {token}}));

        if (isTokenBlocked) {
            throw new UnauthorizedError('This JWT token has been blocked!');
        }

        request.user = await this.userRepository.findOne({where: {email: decodedToken.email}});
        next();
    }
}
