import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Following } from './following.entity';
import { FollowingDto } from './followingDto/following.dto';
import { User } from '../users/user.entity';
import { FOLLOWING_REPOSITORY } from '../../core/constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class FollowingService {
  constructor(
    @Inject(FOLLOWING_REPOSITORY)
    private readonly followingRepository: typeof Following,
  ) {}
  @Inject(UsersService) private readonly usersService: UsersService;

  async create(following: FollowingDto, userId): Promise<Following> {
    if ((await this.findOneUser(following.followingId)).length != 0) {
      return await this.followingRepository.create<Following>({
        ...following,
        userId,
      });
    } else {
      throw new NotFoundException("This User doesn't exist");
    }
  }

  async findAll(): Promise<Following[]> {
    return await this.followingRepository.findAll<Following>({
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findById(userId): Promise<Following[]> {
    return await this.followingRepository.findAll<Following>({
      where: { userId },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOne(id): Promise<Following> {
    return await this.followingRepository.findOne({
      where: { id },
      include: [{ model: User, attributes: { exclude: ['password'] } }],
    });
  }

  async findOneUser(id): Promise<User[]> {
    return await this.usersService.findAllByIdSecure(id);
  }

  async delete(id, userId) {
    return await this.followingRepository.destroy({ where: { id, userId } });
  }
}
