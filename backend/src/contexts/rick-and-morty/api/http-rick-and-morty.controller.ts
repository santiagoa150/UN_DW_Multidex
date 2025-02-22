import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { HttpRickAndMortyConstants } from './http-rick-and-morty.constants';
import { ApiAcceptedResponse, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CommandBus } from '@nestjs/cqrs';
import { DefaultResponse } from '../../shared/api/responses/default.response';
import { CreateRickAndMortyCharacterRequest } from './requests/create-rick-and-morty-character.request';
import { JwtAuthGuard } from '../../user/infrastructure/nestjs/guards/jwt/jwt-auth.guard';
import { GetUserAuthData } from '../../user/infrastructure/nestjs/guards/get-user-auth-data.decorattor';
import { UserAuthData } from '../../user/domain/user-auth-data';
import { CreateRickAndMortyCharacterCommand } from '../applications/create/create-rick-and-morty-character.command';
import { UpdateRickAndMortyCharacterCommand } from '../applications/update/update-rick-and-morty-character.command';
import { UpdateRickAndMortyCharacterRequest } from './requests/update-rick-and-morty-character.request';

/**
 * Controller for the Rick and Morty API.
 */
@Controller(HttpRickAndMortyConstants.PREFIX)
@ApiTags(HttpRickAndMortyConstants.API_TAG)
export class HttpRickAndMortyController {
    /**
     * @param _commandBus - The command bus used to dispatch commands.
     */
    constructor(private readonly _commandBus: CommandBus) {}

    /**
     * Creates a character.
     * @param body - The request body.
     * @param authData - The user authentication data.
     * @returns The default response.
     */
    @Post(HttpRickAndMortyConstants.GENERAL_CHARACTER_ID_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async createCharacter(
        @Body() body: CreateRickAndMortyCharacterRequest,
        @GetUserAuthData() authData: UserAuthData,
    ): Promise<DefaultResponse> {
        await this._commandBus.execute<CreateRickAndMortyCharacterCommand>(
            new CreateRickAndMortyCharacterCommand(
                authData.userId,
                body.description,
                body.frontImageUrl,
                body.gender,
                body.location,
                body.name,
                body.origin,
                body.status,
                body.type,
            ),
        );
        return new DefaultResponse();
    }

    /**
     * Updates a character.
     * @param body - The request body.
     * @param authData - The user authentication data.
     * @returns The default response.
     */
    @Patch(HttpRickAndMortyConstants.GENERAL_CHARACTER_ID_URI)
    @ApiAcceptedResponse({ type: DefaultResponse })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    async updateCharacter(
        @Body() body: UpdateRickAndMortyCharacterRequest,
        @GetUserAuthData() authData: UserAuthData,
    ): Promise<DefaultResponse> {
        await this._commandBus.execute<UpdateRickAndMortyCharacterCommand>(
            new UpdateRickAndMortyCharacterCommand(
                body.id,
                authData.userId,
                body.description,
                body.frontImageUrl,
                body.gender,
                body.location,
                body.name,
                body.origin,
                body.status,
                body.type,
            ),
        );
        return new DefaultResponse();
    }
}
