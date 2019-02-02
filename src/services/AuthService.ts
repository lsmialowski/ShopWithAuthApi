import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jsonwebtoken';
import * as config from 'nconf';
import {UnauthorizedError} from 'routing-controllers';
import {Service} from 'typedi';
import {Repository} from 'typeorm';
import {InjectRepository} from 'typeorm-typedi-extensions';
import {decodeAndValidateToken, getToken} from '../common/authorization/auth.util';
import AuthDto from '../dtos/AuthDto';
import AuthLoginDto from '../dtos/AuthLoginDto';
import InvalidToken from '../models/InvalidToken';
import UserRepository from '../repositories/UserRepository';

@Service()
export default class AuthService {

    @InjectRepository()
    private readonly userRepository: UserRepository;

    @InjectRepository(InvalidToken)
    private readonly invalidTokensRepository: Repository<InvalidToken>;

    public async register(data: AuthDto) {
        const userExist = await this.userRepository.checkIfExist(data.email);

        if (userExist) {
            throw new Error(`User with mail ${data.email} already exists`);
        }

        const passwordHash = this.encodePassword(data.password);
        const user = await this.userRepository.save({
            id: undefined,
            name: data.name,
            email: data.email,
            passwordHash,
        });

        return {
            email: user.email,
            name: user.name,
        };
    }

    public async login(credentcials: AuthLoginDto) {
        const user = await this.userRepository.findOneOrFail({where: {email: credentcials.email}})
            .catch(() => {
                throw new UnauthorizedError(`Account with e-mail ${credentcials.email} doesn't exist`);
            });
        const passwordsMatch = bcrypt.compareSync(credentcials.password, user.passwordHash);

        if (!passwordsMatch) {
            throw new UnauthorizedError('Invalid credentials');
        }

        const token = jwt.sign({email: credentcials.email},
            config.get('jwt_token'),
            {expiresIn: '24h'},
        );

        return {
            email: user.email,
            token,
        };
    }

    public async logout(token: string) {
        token = getToken(token);

        const decodedToken: any = decodeAndValidateToken(token);

        const isTokenBlocked = !!(await this.invalidTokensRepository.findOne({where: {token}}));

        if (isTokenBlocked) {
            throw new UnauthorizedError('This JWT token is already blocked!');
        }

        return this.invalidTokensRepository.save({token, expires: decodedToken.exp})
            .then((data: InvalidToken) => {
                return {token: data.token, status: 'Blocked'};
            });
    }

    private encodePassword(password: string) {
        return bcrypt.hashSync(password);
    }
}
