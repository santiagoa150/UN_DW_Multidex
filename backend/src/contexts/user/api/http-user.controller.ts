import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { HttpUserConstants } from './http-user.constants';
import { ApiAcceptedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './requests/login.request';
import { LocalAuthGuard } from '../infrastructure/nestjs/guards/local/local-auth.guard';
import { GetUserAuthData } from '../infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../domain/user-auth-data';
import { CommandBus } from '@nestjs/cqrs';
import { LoginResponse } from './responses/login.response';
import { CreateUserAccessTokenCommand } from '../applications/access-token/create/create-user-access-token.command';
import { DefaultResponse } from '../../shared/api/responses/default.response';
import { SignUpRequest } from './requests/sign-up.request';
import { SignUpCommand } from '../applications/sign-up/sign-up.command';

/**
 * Controller for the User HTTP API.
 */
@Controller(HttpUserConstants.PREFIX)
@ApiTags(HttpUserConstants.API_TAG)
export class HttpUserController {
    /**
     * @param _commandBus - The command bus used to dispatch commands.
     */
    constructor(private readonly _commandBus: CommandBus) {}

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
}
