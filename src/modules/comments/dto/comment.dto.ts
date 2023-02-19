import { IsNotEmpty, MinLength } from 'class-validator';

export class CommentDto {
  //   @IsNotEmpty()
  //   @MinLength(1)
  //   readonly title: string;

  @IsNotEmpty()
  readonly body: string;
}
