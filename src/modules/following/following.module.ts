import { Module } from '@nestjs/common';
import { FollowingService } from './following.service';
import { FollowingController } from './following.controller';
import { followingProviders } from './following.providers';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [FollowingService, ...followingProviders],
  controllers: [FollowingController],
})
export class FollowingModule {}
