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
import { LikeDto } from './dto/like.dto';
import { LikesService } from './likes.service';
import { Like as LikeEntity } from '../likes/like.entity';
@UseGuards(AuthGuard('jwt'))
@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @Get()
  async findAll() {
    // get all posts in the db
    return await this.likeService.findAll();
  }

  @Get('user')
  async findByUser(@Request() req) {
    // get all posts in the db
    return await this.likeService.findByUser(req.user.id);
  }

  @Post()
  async create(@Body() like: LikeDto, @Request() req): Promise<LikeEntity> {
    // create a new post and return the newly created post
    return await this.likeService.create(like, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.likeService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
