import {IsInt} from 'class-validator';

export default class CartDto {
    @IsInt()
    public product: number;

    @IsInt()
    public quantity: number;
}
