import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comment } from '../comments/comment.entity';
import { Post } from '../posts/post.entity';
import { Like } from '../likes/like.entity';
import { Following } from '../following/following.entity';

@Table
export class User extends Model<User> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profilePicture: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  coverPicture: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];

  @HasMany(() => Like)
  likes: Like[];

  @HasMany(() => Following)
  following: Following[];
}
