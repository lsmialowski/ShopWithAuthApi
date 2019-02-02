import {Container, Service} from 'typedi';
import {InjectRepository} from 'typeorm-typedi-extensions';
import ErrorHandler from '../common/error/ErrorHandler';
import ProductDto from '../dtos/ProductDto';
import ProductRepository from '../repositories/ProductRepository';

const ip = require('ip');
import * as nconf from 'nconf';

@Service()
export default class ProductService {
    @InjectRepository()
    private readonly productRepository: ProductRepository;

    public async get(id: string) {
        const product = await this.productRepository.findOneOrFail(id);

        return this.mapProductToResponse(product);
    }

    public async getAll() {
        const product = await this.productRepository.find();
        if (product.length === 0) {

            return [];
        }

        return product.map(product => this.mapProductToResponse(product));
    }

    public async delete(id: string) {
        return  this.productRepository.delete(id);
    }

    public async update(id: string, data: Partial<ProductDto>) {
        let dataToUpdate = {};
        if (data.name) {
            dataToUpdate =  Object.assign(dataToUpdate, {name: data.name});
        }

        if (data.price) {
            dataToUpdate =  Object.assign(dataToUpdate, {price: data.price});
        }

        return this.productRepository.update(id, dataToUpdate);

    }

    public async save(data: ProductDto, fileName: string) {
        const product: any = await this.productRepository.saveData(data, fileName)
            .catch(error => Container.get<ErrorHandler>(ErrorHandler).handle(error));

        return this.mapProductToResponse(product);
    }

    private generateUrlToImage(filename: string) {

        return `http://${ip.address()}:${nconf.get('port')}/api/v1/product/image/${filename}`;
    }

    private mapProductToResponse(product: any) {
        const imageUrl = this.generateUrlToImage(product.imageName);

        return {
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl,
        };
    }
}
