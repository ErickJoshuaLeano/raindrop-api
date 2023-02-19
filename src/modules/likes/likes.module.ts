import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { likesProviders } from './likes.provides';

@Module({
  providers: [LikesService, ...likesProviders],
  controllers: [LikesController],
})
export class LikesModule {}
