import {Column, Entity,OneToMany} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import Cart from './Cart';

@Entity('products')
export default class Product {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public name: string;

    @Column({type: 'integer'})
    public price: number;

    @Column({type: 'varchar'})
    public imageName: string;

    @OneToMany(type => Cart, cart => cart.products)
    public carts: Cart[];
}
