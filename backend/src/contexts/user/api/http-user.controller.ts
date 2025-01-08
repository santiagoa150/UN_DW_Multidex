import { Controller, Post, UseGuards } from '@nestjs/common';
import { HttpUserConstants } from './http-user.constants';
import { ApiAcceptedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from './requests/login.request';
import { LocalAuthGuard } from '../infrastructure/nestjs/guards/local/local-auth.guard';
import { GetUserAuthData } from '../infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../domain/user-auth-data';
import { CommandBus } from '@nestjs/cqrs';
import { LoginResponse } from './responses/login.response';
import { CreateUserAccessTokenCommand } from '../applications/create/access-token/create-user-access-token.command';

/**
 * Controller for the User HTTP API.
 */
@Controller(HttpUserConstants.PREFIX)
@ApiTags(HttpUserConstants.API_TAG)
export class HttpUserController {
    /**
     * @param commandBus - The command bus used to dispatch commands.
     */
    constructor(private readonly commandBus: CommandBus) {}

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
        response.accessToken = await this.commandBus.execute<CreateUserAccessTokenCommand, string>(
            new CreateUserAccessTokenCommand(authData),
        );
        return response;
    }
}
