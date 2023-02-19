import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { postsProviders } from './posts.providers';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [CommentsModule],
  providers: [PostsService, ...postsProviders],
  controllers: [PostsController],
  exports: [PostsService],
})
export class PostsModule {}
