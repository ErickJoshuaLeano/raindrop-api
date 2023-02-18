import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  Matches,
  IsEnum,
} from 'class-validator';

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

  // @IsNotEmpty()
  // @IsEnum(Gender, {
  //   message: 'gender must be either male or female',
  // })
  // readonly gender: Gender;
}
