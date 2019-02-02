import {Column, Entity,  ManyToOne} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import Product from './Product';
import User from './User';

@Entity('carts')
export default class Cart {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'integer'})
    public quantity: number;

    @Column({type: 'integer'})
    public price: number;

    @Column({name: 'deleted_at'})
    public deletedAt?: Date;

    @ManyToOne(type => User, user => user.cart)
    public user: User;

    @ManyToOne(type => Product, product => product.carts)
    public products: Product[];
}
