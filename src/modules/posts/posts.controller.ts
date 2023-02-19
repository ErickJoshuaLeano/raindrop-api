import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './post.entity';
import { PostDto } from './dto/post.dto';
import { Comment as CommentEntity } from '../comments/comment.entity';
import { CommentDto } from '../comments/dto/comment.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PostEntity> {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return post;
  }

  @Post()
  async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
    // create a new post and return the newly created post
    return await this.postService.create(post, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() post: PostDto,
    @Request() req,
  ): Promise<PostEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.postService.update(
      id,
      post,
      req.user.id,
    );

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return the updated post
    return updatedPost;
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.postService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }

  @Post(':id/comments')
  async createComment(
    @Body() comment: CommentDto,
    @Param('id') postId: number,
    @Request() req,
  ): Promise<CommentEntity> {
    // create a new post and return the newly created post
    return await this.postService.createComment(comment, postId, req.user.id);
  }

  @Get(':id/comments')
  async findComments(@Param('id') id: number): Promise<CommentEntity[]> {
    // find the post with this id
    const post = await this.postService.findOne(id);

    // if the post doesn't exit in the db, throw a 404 error
    if (!post) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // if post exist, return the post
    return this.postService.findAllComments(id);
  }

  @Get(':id/comments/:commentId')
  async findComment(
    @Param('commentId') commentId: number,
  ): Promise<CommentEntity> {
    // find the post with this id
    const comment = await this.postService.findComment(commentId);

    // if the comment doesn't exit in the db, throw a 404 error
    if (!comment) {
      throw new NotFoundException("This Comment doesn't exist");
    }

    // if comment exists, return the comment
    return comment;
  }

  @Delete(':id/comments/:commentId')
  async removeComment(
    @Param('id') postId: number,
    @Param('commentId') commentId: number,
    @Request() req,
  ) {
    const comment = await this.postService.findComment(commentId);
    const post = await this.postService.findOne(postId);
    if (post.userId === req.user.id) {
      const deleted = await this.postService.deleteComment(
        commentId,
        comment.userId,
      );
      if (deleted === 0) {
        throw new NotFoundException("This Comment doesn't exist");
      }

      // return success message
      return 'Successfully deleted';
    } else {
      const deleted = await this.postService.deleteComment(
        commentId,
        req.user.id,
      );
      if (deleted === 0) {
        throw new NotFoundException("This Comment doesn't exist");
      }

      // return success message
      return 'Successfully deleted';
    }
    // delete the comment with this id

    // if the number of row affected is zero,
    // then the comment doesn't exist in our db
  }
}
