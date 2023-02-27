import { Following } from './following.entity';
import { FOLLOWING_REPOSITORY } from '../../core/constants';

export const followingProviders = [
  {
    provide: FOLLOWING_REPOSITORY,
    useValue: Following,
  },
];
