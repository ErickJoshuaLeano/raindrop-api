import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { LIKE_REPOSITORY } from 'src/core/constants';
import { LikeDto } from './dto/like.dto';
import { Like } from './like.entity';

@Injectable()
export class LikesService {
  constructor(
    @Inject(LIKE_REPOSITORY) private readonly likeRepository: typeof Like,
  ) {}

  async create(post: LikeDto, userId): Promise<Like> {
    if (post.postId) {
      return await this.likeRepository.create<Like>({
        ...post,
        postId: post.postId,
        userId,
      });
    } else if (post.commentId) {
      return await this.likeRepository.create<Like>({
        ...post,
        commentId: post.commentId,
        userId,
      });
    } else {
      throw new NotFoundException("This Post doesn't exist");
    }
  }
}
