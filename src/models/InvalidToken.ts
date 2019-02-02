import {Column, Entity} from 'typeorm';
import {PrimaryGeneratedColumn} from 'typeorm/decorator/columns/PrimaryGeneratedColumn';

@Entity('invalid_tokens')
export default class InvalidToken {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({type: 'varchar'})
    public token: string;

    @Column({type: 'timestamp'})
    public expires: Date;
}
