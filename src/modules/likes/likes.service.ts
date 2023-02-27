import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { LIKE_REPOSITORY } from 'src/core/constants';
import { LikeDto } from './dto/like.dto';
import { Like } from './like.entity';
import { Post } from '../posts/post.entity';

@Injectable()
export class LikesService {
  constructor(
    @Inject(LIKE_REPOSITORY) private readonly likeRepository: typeof Like,
  ) {}

  async create(post: LikeDto, userId): Promise<Like> {
    if (post.postId) {
      if ((await this.findOnePost(userId, post.postId)).length == 0) {
        return await this.likeRepository.create<Like>({
          ...post,
          postId: post.postId,
          userId,
        });
      } else {
        throw new ForbiddenException('This Post already has a like');
      }
    } else if (post.commentId) {
      if ((await this.findOneComment(userId, post.commentId)).length == 0) {
        return await this.likeRepository.create<Like>({
          ...post,
          commentId: post.commentId,
          userId,
        });
      } else {
        throw new ForbiddenException('This Post already has a like');
      }
    } else {
      throw new NotFoundException("This Post doesn't exist");
    }
  }

  async findByUserId(userId): Promise<Like[]> {
    return await this.likeRepository.findAll<Like>({
      where: { userId },
      include: [{ model: Post }],
    });
  }

  async findAll(): Promise<Like[]> {
    return await this.likeRepository.findAll<Like>({
      order: [['id', 'DESC']],
    });
  }

  async delete(id, userId) {
    return await this.likeRepository.destroy({ where: { id, userId } });
  }

  async findOnePost(userId, postId): Promise<Like[]> {
    return await this.likeRepository.findAll<Like>({
      where: { userId, postId },
    });
  }

  async findOneComment(userId, commentId): Promise<Like[]> {
    const queryResult = await this.likeRepository.findAll<Like>({
      where: { userId, commentId },
    });
    return queryResult;
  }
}
