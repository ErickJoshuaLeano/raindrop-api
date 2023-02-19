import { IsNotEmpty, IsOptional, IsUrl, ValidateIf } from 'class-validator';

export class PostDto {
  // @IsNotEmpty()
  // @MinLength(4)
  // readonly title: string;

  @IsNotEmpty()
  readonly body: string;

  @ValidateIf((post) => post.postPicture !== '')
  @IsUrl()
  @IsOptional()
  readonly postPicture: string;
}
