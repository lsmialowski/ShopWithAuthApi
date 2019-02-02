import { IsEmail, IsString, Length, ValidateIf} from 'class-validator';

export default class AuthDto {

  @IsString()
  @Length(1, 255)
  public name: string;

  @IsEmail()
  @Length(5, 255)
  public email: string;

  @IsString()
  @Length(8, 50)
  public password: string;

  @IsString()
  @Length(8, 50)
  @ValidateIf((properties, currentproperty) => properties.password === currentproperty,
      {message: 'Password and Password_repeat must match'})
  public password_repeat: string;
}
