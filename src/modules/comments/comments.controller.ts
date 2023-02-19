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
import { CommentsService } from './comments.service';
import { Comment as CommentEntity } from './comment.entity';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get()
  async findAll() {
    // get all comments in the db
    return await this.commentService.findAll();
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<CommentEntity> {
  //   // find the comment with this id
  //   const comment = await this.commentService.findOne(id);

  //   // if the comment doesn't exit in the db, throw a 404 error
  //   if (!comment) {
  //     throw new NotFoundException("This Comment doesn't exist");
  //   }

  //   // if comment exist, return the comment
  //   return comment;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async create(
  //   @Body() comment: CommentDto,
  //   @Request() req,
  // ): Promise<CommentEntity> {
  //   // create a new comment and return the newly created comment
  //   return await this.commentService.create(comment, req.user.id);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Put(':id')
  // async update(
  //   @Param('id') id: number,
  //   @Body() comment: CommentDto,
  //   @Request() req,
  // ): Promise<CommentEntity> {
  //   // get the number of row affected and the updated comment
  //   const { numberOfAffectedRows, updatedComment } =
  //     await this.commentService.update(id, comment, req.user.id);

  //   // if the number of row affected is zero,
  //   // it means the comment doesn't exist in our db
  //   if (numberOfAffectedRows === 0) {
  //     throw new NotFoundException("This Comment doesn't exist");
  //   }

  //   // return the updated comment
  //   return updatedComment;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Delete(':id')
  // async remove(@Param('id') id: number, @Request() req) {
  //   // delete the comment with this id
  //   const deleted = await this.commentService.delete(id, req.user.id);

  //   // if the number of row affected is zero,
  //   // then the comment doesn't exist in our db
  //   if (deleted === 0) {
  //     throw new NotFoundException("This Comment doesn't exist");
  //   }

  //   // return success message
  //   return 'Successfully deleted';
  // }
}
