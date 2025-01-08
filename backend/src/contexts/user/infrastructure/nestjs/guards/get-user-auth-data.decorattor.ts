import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserAuthData } from '../../../domain/user-auth-data';

/**
 * Decorator to retrieve user authentication data from the request object.
 * @returns `UserAuthData` - The user authentication data associated with the current request.
 */
export const GetUserAuthData = createParamDecorator((_: unknown, context: ExecutionContext): UserAuthData => {
    switch (context.getType()) {
        case 'http': {
            const request = context.switchToHttp().getRequest();
            return request.user as UserAuthData;
        }
        default:
            throw new Error('Context not supported on GetUserAuthData Decorator.');
    }
});
