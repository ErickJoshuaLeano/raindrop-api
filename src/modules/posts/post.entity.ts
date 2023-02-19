import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Table
export class Post extends Model<Post> {
  // @Column({
  //   type: DataType.STRING,
  //   allowNull: false,
  // })
  // title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  body: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  postPicture: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}
