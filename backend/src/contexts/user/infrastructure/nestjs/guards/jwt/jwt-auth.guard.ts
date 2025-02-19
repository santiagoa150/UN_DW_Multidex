import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';
import { ValidateUserAccessTokenQuery } from '../../../../applications/access-token/validate/validate-user-access-token.query';
import { UserAuthData } from '../../../../domain/user-auth-data';

/**
 * Guard to validate the JWT token.
 */
@Injectable()
export class JwtAuthGuard implements CanActivate {
    /**
     * @param queryBus - The query bus to execute queries.
     */
    constructor(private readonly queryBus: QueryBus) {}

    /**
     * Method to validate the JWT token.
     * @param context - The execution context with user request data.
     * @returns A promise with a boolean indicating if the user is authenticated.
     */
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const token: string | null = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        const authData = await this.queryBus.execute<ValidateUserAccessTokenQuery, UserAuthData | undefined>(
            new ValidateUserAccessTokenQuery(token),
        );
        if (!authData) {
            throw new UnauthorizedException();
        }
        request.user = authData;
        return true;
    }
}
