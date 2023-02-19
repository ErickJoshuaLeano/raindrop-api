import { IsOptional } from 'class-validator';

export class LikeDto {
  @IsOptional()
  readonly postId: number;

  @IsOptional()
  readonly commentId: number;
}
