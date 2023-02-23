import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { ProfilesController } from './users.controller';
import { PostsModule } from '../posts/posts.module';
import { LikesModule } from '../likes/likes.module';

@Module({
  imports: [PostsModule, LikesModule],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  controllers: [UsersController, ProfilesController],
})
export class UsersModule {}
