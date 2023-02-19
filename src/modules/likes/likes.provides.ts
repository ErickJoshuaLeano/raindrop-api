import { Like } from './like.entity';
import { LIKE_REPOSITORY } from '../../core/constants';

export const likesProviders = [
  {
    provide: LIKE_REPOSITORY,
    useValue: Like,
  },
];
