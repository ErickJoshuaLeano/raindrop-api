import { Injectable, Inject } from '@nestjs/common';
import { Comment } from './comment.entity';
import { CommentDto } from './dto/comment.dto';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { COMMENT_REPOSITORY } from '../../core/constants';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: typeof Comment,
  ) {}

  async create(comment: CommentDto, userId): Promise<Comment> {
    return await this.commentRepository.create<Comment>({ ...comment, userId });
  }

  async findAll(): Promise<Comment[]> {
    return await this.commentRepository.findAll<Comment>({
      include: [
        { model: Post },
        { model: User, attributes: { exclude: ['password'] } },
      ],
    });
  }

  async findOne(id): Promise<Comment> {
    return await this.commentRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async delete(id, userId) {
    return await this.commentRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedComment]] =
      await this.commentRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedComment };
  }
}
