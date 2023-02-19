import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Post } from '../posts/post.entity';
import { Comment } from '../comments/comment.entity';
import { User } from '../users/user.entity';

@Table
export class Like extends Model<Like> {
  @ForeignKey(() => Post)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  postId: number;

  @BelongsTo(() => Post)
  post: Post;

  @ForeignKey(() => Comment)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  commentId: number;

  @BelongsTo(() => Comment)
  comment: Comment;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;
}
