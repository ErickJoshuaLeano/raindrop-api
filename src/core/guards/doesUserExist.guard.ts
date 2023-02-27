import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class DoesUserExist implements CanActivate {
  constructor(private readonly userService: UsersService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const userEmailExist = await this.userService.findOneByEmail(
      request.body.email,
    );
    const userUsernameExist = await this.userService.findOneByUsername(
      request.body.username,
    );
    if (userEmailExist) {
      throw new ForbiddenException('This email already exists');
    } else if (userUsernameExist) {
      throw new ForbiddenException('This username is already taken');
    }
    return true;
  }
}
