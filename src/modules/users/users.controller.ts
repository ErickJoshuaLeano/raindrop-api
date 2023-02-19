import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDto } from '../users/dto/user.dto';
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
}
