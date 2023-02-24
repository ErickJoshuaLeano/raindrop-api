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

export class UpdateUserDto {
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

  @ValidateIf((user) => user.profilePicture !== '')
  @IsUrl()
  @IsOptional()
  readonly profilePicture: string;

  @ValidateIf((user) => user.coverPicture !== '')
  @IsUrl()
  @IsOptional()
  readonly coverPicture: string;
}
