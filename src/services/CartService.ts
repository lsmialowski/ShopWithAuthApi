import {Service} from 'typedi';
import {InjectRepository} from 'typeorm-typedi-extensions';
import CartDto from '../dtos/CartDto';
import User from '../models/User';
import CartRepository from '../repositories/CartRepository';
import ProductRepository from '../repositories/ProductRepository';

@Service()
export default class CartService {
    @InjectRepository()
    private readonly cartRepository: CartRepository;

    @InjectRepository()
    private readonly productRepository: ProductRepository;

    public async get(user: User) {
        return this.cartRepository.getProductsList(user);
    }

    public getSummary(user: User) {
        return this.cartRepository.getSummary(user);
    }

    public async save(data: CartDto, user: User) {
        const product = await this.productRepository.findOneOrFail({id: data.product});

        return this.cartRepository.saveCart(data, user, product);
    }

    public async delete(id: string, user: User) {
        return this.cartRepository.softDelete(id, user);
    }

}
