import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { HttpUserConstants } from './http-user.constants';
import { ApiAcceptedResponse, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './requests/login.request';
import { LocalAuthGuard } from '../infrastructure/nestjs/guards/local/local-auth.guard';
import { GetUserAuthData } from '../infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../domain/user-auth-data';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { LoginResponse } from './responses/login.response';
import { CreateUserAccessTokenCommand } from '../applications/access-token/create/create-user-access-token.command';
import { DefaultResponse } from '../../shared/api/responses/default.response';
import { SignUpRequest } from './requests/sign-up.request';
import { SignUpCommand } from '../applications/sign-up/sign-up.command';
import { GetUserMeResponse } from './responses/get-user-me.response';
import { JwtAuthGuard } from '../infrastructure/nestjs/guards/jwt/jwt-auth.guard';
import { GetUserByIdQuery } from '../applications/get/by-id/get-user-by-id.query';

/**
 * Controller for the User HTTP API.
 */
@Controller(HttpUserConstants.PREFIX)
@ApiTags(HttpUserConstants.API_TAG)
export class HttpUserController {
    /**
     * @param _queryBus - The query bus used to dispatch queries.
     * @param _commandBus - The command bus used to dispatch commands.
     */
    constructor(
        private readonly _queryBus: QueryBus,
        private readonly _commandBus: CommandBus,
    ) {}

    /**
     * Endpoint that executes the login operation.
     * @param authData - The user authentication data.
     * @returns A promise that resolves with the login response containing the access token.
     */
    @Post(HttpUserConstants.LOGIN_URI)
    @ApiBody({ type: LoginRequest })
    @UseGuards(LocalAuthGuard)
    @ApiAcceptedResponse({ type: LoginResponse })
    async login(@GetUserAuthData() authData: UserAuthData): Promise<LoginResponse> {
        const response = new LoginResponse();
        response.accessToken = await this._commandBus.execute<CreateUserAccessTokenCommand, string>(
            new CreateUserAccessTokenCommand(authData),
        );
        return response;
    }

    /**
     * Endpoint that executes the sign-up operation.
     * @param body - The sign-up request body.
     * @returns A promise that resolves with the default response.
     */
    @Post(HttpUserConstants.SIGN_UP_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    async signUp(@Body() body: SignUpRequest): Promise<DefaultResponse> {
        await this._commandBus.execute<SignUpCommand>(
            new SignUpCommand(body.email, body.username, body.password, body.names, body.lastNames),
        );
        return new DefaultResponse();
    }

    /**
     * Endpoint that executes the get me operation.
     * @param userAuthData - The user authentication data.
     * @returns A promise that resolves with the get me response containing the user data.
     */
    @Get(HttpUserConstants.GET_USER_URI)
    @ApiAcceptedResponse({ type: GetUserMeResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async getMe(@GetUserAuthData() userAuthData: UserAuthData): Promise<GetUserMeResponse> {
        const response = new GetUserMeResponse();
        const user = await this._queryBus.execute(new GetUserByIdQuery(userAuthData.userId));
        response.user = {
            userId: user.userId,
            email: user.email,
            username: user.username,
            names: user.names,
            lastNames: user.lastNames,
        };
        return response;
    }
}
