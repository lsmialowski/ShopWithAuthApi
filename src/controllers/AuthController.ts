import {Body, HeaderParam, JsonController, Post} from 'routing-controllers';
import {Inject} from 'typedi';
import AuthDto from '../dtos/AuthDto';
import AuthLoginDto from '../dtos/AuthLoginDto';
import AuthService from '../services/AuthService';

@JsonController('/authorization')
export default class AuthController {
    @Inject()
    private readonly authService: AuthService;

    @Post('/login')
    public async login(@Body() credentcials: AuthLoginDto) {
        return this.authService.login(credentcials);
    }

    @Post('/registration')
    public register(@Body() data: AuthDto) {
        return this.authService.register(data);
    }

    @Post('/logout')
    public async logout(@HeaderParam('Authorization', {required: true}) token: string) {
        return this.authService.logout(token);
    }
}
