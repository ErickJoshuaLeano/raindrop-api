import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsEnum,
  IsString,
  IsOptional,
  IsUrl,
  NotContains,
  ValidateIf,
} from 'class-validator';
import { Match } from './match.decorator';

// enum Gender {
//   MALE = 'male',
//   FEMALE = 'female',
// }

export class UserDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly name: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(15)
  @NotContains(' ', { message: 'username should not have spaces' })
  readonly username: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).*$/, {
    message:
      'password must contain a lowercase letter, uppercase letter, number and special character',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'please confirm your password' })
  @Match('password', { message: 'password does not match' })
  confirmPassword: string;

  @ValidateIf((user) => user.profilePicture !== '')
  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;
  // @IsNotEmpty()
  // @IsEnum(Gender, {
  //   message: 'gender must be either male or female',
  // })
  // readonly gender: Gender;
}
