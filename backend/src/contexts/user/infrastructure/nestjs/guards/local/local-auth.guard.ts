import { AuthGuard } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

/**
 * `LocalAuthGuard` is a guard that uses the 'local' strategy for authentication.
 */
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
