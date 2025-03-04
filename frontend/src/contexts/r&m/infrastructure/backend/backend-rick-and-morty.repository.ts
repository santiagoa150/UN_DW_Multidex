import axios from 'axios';
import { RickAndMortyRepository } from '../../domain/interfaces/rick-and-morty.repository.ts';
import { BackendRickAndMortyConstants } from './backend-rick-and-morty.constants.ts';

/**
 * Repository to manage the Rick and Morty characters in the backend.
 */
export class BackendRickAndMortyRepository implements RickAndMortyRepository {
    /**
     * Create a new Rick and Morty character.
     * @param token - The token to authenticate the request.
     * @param frontImageUrl - The front image URL of the character.
     * @param name - The name of the character.
     * @param entityType - The type of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param origin - The origin of the character.
     * @param location - The location of the character.
     * @param description - The description of the character.
     */
    async create(
        token: string,
        frontImageUrl: string,
        name: string,
        entityType: string,
        status: string,
        gender: string,
        origin: string,
        location: string,
        description: string,
    ): Promise<void> {
        try {
            await axios.post(
                BackendRickAndMortyConstants.GENERAL_CHARACTER_URI,
                {
                    status,
                    gender,
                    location,
                    origin,
                    name,
                    frontImageUrl,
                    description,
                    type: entityType,
                },
                {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
        }
    }

    /**
     * Edit a new Rick and Morty character.
     * @param token - The token to authenticate the request.
     * @param id - The ID of the character to edit.
     * @param frontImageUrl - The front image URL of the character.
     * @param name - The name of the character.
     * @param entityType - The type of the character.
     * @param status - The status of the character.
     * @param gender - The gender of the character.
     * @param origin - The origin of the character.
     * @param location - The location of the character.
     * @param description - The description of the character.
     */
    async edit(
        token: string,
        id: number,
        frontImageUrl: string,
        name: string,
        entityType: string,
        status: string,
        gender: string,
        origin: string,
        location: string,
        description: string,
    ): Promise<void> {
        try {
            await axios.patch(
                BackendRickAndMortyConstants.GENERAL_CHARACTER_URI,
                {
                    id,
                    status,
                    gender,
                    location,
                    origin,
                    name,
                    frontImageUrl,
                    description,
                    type: entityType,
                },
                {
                    baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
        } catch (e) {
            console.error(e);
        }
    }
}
