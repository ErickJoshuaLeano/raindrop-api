import { IsOptional } from 'class-validator';

export class FollowingDto {
  @IsOptional()
  readonly followingId: number;
}
