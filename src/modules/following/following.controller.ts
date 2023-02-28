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
import { FollowingService } from './following.service';
import { Following as FollowingEntity } from './following.entity';
import { FollowingDto } from './followingDto/following.dto';

@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll() {
    // get all posts in the db
    return await this.followingService.findAll();
  }
  //   @UseGuards(AuthGuard('jwt'))
  //   @Get(':id')
  //   async findOne(@Param('id') id: number): Promise<FollowingEntity> {
  //     // find the post with this id
  //     const following = await this.followingService.findOne(id);

  //     // if the post doesn't exit in the db, throw a 404 error
  //     if (!following) {
  //       throw new NotFoundException("This Post doesn't exist");
  //     }

  //     // if post exist, return the post
  //     return following;
  //   }

  @UseGuards(AuthGuard('jwt'))
  @Get('all')
  async findAllFollowing(@Request() req) {
    // find the post with this id
    const following = await this.followingService.findById(req.user.id);
    // if post exist, return the post
    return following;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @Body() following: FollowingDto,
    @Request() req,
  ): Promise<FollowingEntity> {
    return await this.followingService.create(following, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.followingService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException("This Post doesn't exist");
    }

    // return success message
    return 'Successfully deleted';
  }
}
