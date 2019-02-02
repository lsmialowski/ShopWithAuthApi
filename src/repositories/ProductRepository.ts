import {EntityRepository, Repository} from 'typeorm';
import ProductDto from '../dtos/ProductDto';
import Product from '../models/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {

    public saveData(data: ProductDto, fileName: string) {
        return this.save({
            name: data.name,
            price: Number(data.price),
            imageName: fileName,
        });
    }
}
