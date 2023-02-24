import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  Patch,
  Param,
  Query,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { User as UserEntity } from './user.entity';
import { UserDto } from '../users/dto/user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import SearchUsersQuery from './searchUsersQuery';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(DoesUserExist)
  @Post()
  async signUp(@Body() user: UserDto) {
    return await this.usersService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put()
  async update(@Body() user: UserDto, @Request() req): Promise<UserEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedUser } =
      await this.usersService.update(user, req.user.id);

    // if the number of row affected is zero,
    // it means the user doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    // return the updated user
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch()
  async updateNoPass(
    @Body() user: UpdateUserDto,
    @Request() req,
  ): Promise<UserEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedUser } =
      await this.usersService.updateNoPass(user, req.user.id);

    // if the number of row affected is zero,
    // it means the user doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("This User doesn't exist");
    }

    // return the updated user
    return updatedUser;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async findCurrentUser(@Request() req) {
    return await this.usersService.findOneByIdSecure(req.user.id);
  }
}
@UseGuards(AuthGuard('jwt'))
@Controller('profiles')
export class ProfilesController {
  constructor(private usersService: UsersService) {}

  @Get('all')
  async findAllProfiles() {
    return await this.usersService.findAllSecure();
  }

  @Get('/search/:searchQuery')
  async searchProfiles(@Param('searchQuery') searchQuery: string) {
    return await this.usersService.searchProfilesSecure(searchQuery);
  }

  @Get(':username')
  async findProfile(@Param('username') username: string) {
    return await this.usersService.findOneByUsernameSecure(username);
  }

  @Get(':username/posts')
  async findProfilePosts(@Param('username') username: string) {
    return await this.usersService.findPostByUsername(username);
  }

  @Get(':username/likes')
  async findProfileLikes(@Param('username') username: string) {
    return await this.usersService.findLikesByUsername(username);
  }
}
