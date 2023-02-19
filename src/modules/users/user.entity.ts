import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from '../posts/post.entity';

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

  @HasMany(() => Post, { foreignKey: 'id' })
  posts: Post[];
  // @Column({
  //   type: DataType.ENUM,
  //   values: ['male', 'female'],
  //   allowNull: false,
  // })
  // gender: string;
}
