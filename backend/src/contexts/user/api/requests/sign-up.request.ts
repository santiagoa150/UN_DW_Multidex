import { PickType } from '@nestjs/swagger';
import { HttpUserModel } from '../models/http-user.model';

/**
 * Request to sign up a user.
 */
export class SignUpRequest extends PickType(HttpUserModel, ['email', 'names', 'username', 'lastNames', 'password']) {}
