import {
    Body,
    Controller,
    CurrentUser, Delete,
    Get,
    Param,
    Post,
    UseBefore,
} from 'routing-controllers';
import {Inject} from 'typedi';
import CartDto from '../dtos/CartDto';
import {AuthMiddleware} from '../middlewares/AuthMiddleware';
import User from '../models/User';
import CartService from '../services/CartService';

@UseBefore(AuthMiddleware)
@Controller('/cart')
export default class CartController {
    @Inject()
    private readonly cartService: CartService;

    @Get('/')
    public async get(@CurrentUser() user: User) {
        return this.cartService.get(user);
    }

    @Get('/summary')
    public async getSummary(@CurrentUser() user: User) {
        return this.cartService.getSummary(user);
    }
    @Post('/')
    public async create(@CurrentUser() user: User, @Body() data: CartDto) {
        return this.cartService.save(data, user);
    }

    @Delete('/:id')
    public async delete(@CurrentUser() user: User, @Param('id') id: string) {
        return this.cartService.delete(id, user);
    }
}
