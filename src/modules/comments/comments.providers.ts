import { Comment } from './comment.entity';
import { COMMENT_REPOSITORY } from '../../core/constants';

export const commentsProviders = [
  {
    provide: COMMENT_REPOSITORY,
    useValue: Comment,
  },
];
