import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../../core/constants';
import { PostsService } from '../posts/posts.service';
import * as bcrypt from 'bcrypt';
import { Post } from '../posts/post.entity';
import { Op, or } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}
  @Inject(PostsService) private readonly postsService: PostsService;

  public async create(user: UserDto) {
    // hash the password
    const pass = await this.hashPassword(user.password);

    // create the user
    const newUser = await this.userRepository.create<User>({
      ...user,
      password: pass,
    });

    // tslint:disable-next-line: no-string-literal
    const { password, ...result } = newUser['dataValues'];

    // generate token
    // const token = await this.generateToken(result);

    // return the user and the token
    // return { user: result, token };
    return { user: result };
  }

  async update(data, id) {
    const pass = await this.hashPassword(data.password);
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { ...data, password: pass },
        { where: { id }, returning: true },
      );

    return { numberOfAffectedRows, updatedUser };
  }

  // private async generateToken(user) {
  //   const token = await this.jwtService.signAsync(user);
  //   return token;
  // }

  private async hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  // async create(user: UserDto): Promise<User> {
  //   return await this.userRepository.create<User>(user);
  // }

  async findAllSecure(): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [
          { email },
          {
            email: {
              [Op.iLike]: email,
            },
          },
        ],
      },
    });
  }

  async findOneByEmailSecure(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [
          { email },
          {
            email: {
              [Op.iLike]: email,
            },
          },
        ],
      },
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [
          { username },
          {
            username: {
              [Op.iLike]: username,
            },
          },
        ],
      },
    });
  }

  async findOneByUsernameSecure(username: string): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: {
        [Op.or]: [
          { username },
          {
            username: {
              [Op.iLike]: username,
            },
          },
        ],
      },
      attributes: { exclude: ['password'] },
    });
  }

  async searchProfilesSecure(query: string): Promise<User[]> {
    return await this.userRepository.findAll<User>({
      where: {
        [Op.or]: [
          {
            username: {
              [Op.iLike]: `%${query}%`,
            },
          },
          {
            name: {
              [Op.iLike]: `%${query}%`,
            },
          },
        ],
      },
      attributes: { exclude: ['password'] },
    });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
    });
  }

  async findOneByIdSecure(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({
      where: { id },
      attributes: { exclude: ['password'] },
    });
  }

  async findPostByUsername(username: string): Promise<Post[]> {
    const id = (await this.findOneByUsernameSecure(username)).id;
    return await this.postsService.findByUserId(id);
  }
}
