import { Injectable, Inject } from '@nestjs/common';
import { Post } from './post.entity';
import { PostDto } from './dto/post.dto';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';
import { POST_REPOSITORY } from '../../core/constants';
import { CommentsService } from '../comments/comments.service';
import { Like } from '../likes/like.entity';

@Injectable()
export class PostsService {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: typeof Post,
  ) {}
  @Inject(CommentsService) private readonly commentsService: CommentsService;

  async create(post: PostDto, userId): Promise<Post> {
    return await this.postRepository.create<Post>({ ...post, userId });
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      order: [['id', 'DESC']],
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Like },
      ],
    });
  }

  async findByUserId(userId): Promise<Post[]> {
    return await this.postRepository.findAll<Post>({
      where: { userId },
      order: [['id', 'DESC']],
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Like },
      ],
    });
  }

  async findOne(id): Promise<Post> {
    return await this.postRepository.findOne({
      where: { id },
      include: [
        { model: User, attributes: { exclude: ['password'] } },
        { model: Like },
      ],
    });
  }

  async delete(id, userId) {
    return await this.postRepository.destroy({ where: { id, userId } });
  }

  async update(id, data, userId) {
    const [numberOfAffectedRows, [updatedPost]] =
      await this.postRepository.update(
        { ...data },
        { where: { id, userId }, returning: true },
      );

    return { numberOfAffectedRows, updatedPost };
  }

  async findAllComments(postId): Promise<Comment[]> {
    return await this.commentsService.findAllByPostId(postId);
  }

  async createComment(comment, postId, userId): Promise<Comment> {
    return await this.commentsService.create(comment, postId, userId);
  }

  async deleteComment(commentId, userId) {
    return await this.commentsService.delete(commentId, userId);
  }

  async findComment(commentId) {
    return await this.commentsService.findOne(commentId);
  }

  async updateComment(commentId, comment, userId) {
    return await this.commentsService.update(commentId, comment, userId);
  }
}
