import {Column, CreateDateColumn, Entity, OneToMany} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';
import Cart from './Cart';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar', length: 255})
    public email: string;

    @Column({type: 'varchar', length: 255})
    public name: string;

    @Column({type: 'varchar', name: 'password', length: 255})
    public passwordHash: string;

    @CreateDateColumn({name: 'created_at'})
    private createdAt?: Date;

    @OneToMany(type => Cart, cart => cart.user)
    public cart: Cart[];
}
