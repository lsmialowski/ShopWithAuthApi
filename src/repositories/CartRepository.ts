import {Container} from 'typedi';
import {createQueryBuilder, EntityRepository, Repository} from 'typeorm';
import ErrorHandler from '../common/error/ErrorHandler';
import CartDto from '../dtos/CartDto';
import Cart from '../models/Cart';
import User from '../models/User';

@EntityRepository(Cart)
export default class CartRepository extends Repository<Cart> {

    public getProductsList(user: User) {
        // i wszystkie relacje i tak w diabli wzieli, bo w TypeORM nie ma groupBy XD
        return createQueryBuilder('carts', 'c')
            .select('userId')
            .leftJoin('products', 'p', 'c.productsId = p.id')
            .addSelect('SUM(c.price)', 'price')
            .addSelect('p.name', 'name')
            .addSelect('c.productsId')
            .groupBy('c.productsId')
            .where({userId: user.id, deletedAt: null})
            .execute();
    }

    public getSummary(user: User) {
        return createQueryBuilder('carts', 'c')
            .select('COUNT(c.quantity)', 'totalItems')
            .addSelect('SUM(c.price)', 'totalPrice')
            .addSelect('SUM(c.id)', 'totalActiveOrders')
            .where({userId: user.id, deletedAt: null})
            .execute();
    }

    public saveCart(data: CartDto, user: User, product: any) {
        return this.save({
            user,
            products: product,
            quantity: data.quantity,
            price: (data.quantity * product.price),
        }).catch((error: any) => {
            Container.get<ErrorHandler>(ErrorHandler).handle(error);
        });
    }

    public softDelete(id: string, user: User) {
        return this.update({id, user}, {deletedAt: new Date()});
    }
}
