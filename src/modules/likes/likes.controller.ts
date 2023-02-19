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

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() like: LikeDto, @Request() req): Promise<LikeEntity> {
    // create a new post and return the newly created post
    return await this.likeService.create(like, req.user.id);
  }
}
