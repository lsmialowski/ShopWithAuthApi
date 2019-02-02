import { IsEmail, IsString, Length} from 'class-validator';

export default class AuthLoginDto {
  @IsEmail()
  @Length(5, 255)
  public email: string;

  @IsString()
  @Length(8, 50)
  public password: string;

}
