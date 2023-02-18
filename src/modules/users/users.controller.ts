import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from './users.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';

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
    return await this.usersService.findOneById(req.user.id);
  }
}
