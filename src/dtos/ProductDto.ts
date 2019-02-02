import {IsNumberString, IsOptional, IsString, Length} from 'class-validator';

export default class ProductDto {

    @IsOptional({groups: ['ProductEdit']})
    @IsString({always: true})
    @Length(1, 255,{always: true})
    public name: string;

    @IsOptional({groups: ['ProductEdit']})
    /** maximum int length is 10 */
    @IsNumberString({always: true})
    @Length(1,10)
    public price: string;
}
