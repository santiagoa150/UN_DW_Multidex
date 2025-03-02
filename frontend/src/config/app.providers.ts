import { BackendUniverseRepository } from '../contexts/universe/infrastructure/backend/backend-universe.repository.ts';
import { GetUniverseEntityByIdAndTypeApplication } from '../contexts/universe/applications/get/entity-by-id-and-type/get-universe-entity-by-id-and-type.application.ts';
import { LocalStorageRepository } from '../contexts/shared/infrastructure/local-storage/local-storage.repository.ts';
import { SetCurrentUniverseTypeApplication } from '../contexts/universe/applications/set/current-universe-type/set-current-universe-type.application.ts';
import { GetCurrentUniverseTypeApplication } from '../contexts/universe/applications/get/current-universe-type/get-current-universe-type.application.ts';
import { BackendPokemonRepository } from '../contexts/pokemon/infrastructure/backend/backend-pokemon.repository.ts';
import { GetPokemonDetailByIdApplication } from '../contexts/pokemon/applications/get/detail-by-id/get-pokemon-detail-by-id.application.ts';
import { GetUniverseEntityByTypeApplication } from '../contexts/universe/applications/get/get-universe-entity-by-type.application.ts';

/**
 * This file is used to define the providers of the application.
 */

/**
 * These are the private dependencies of the application.
 */
const backendPokemonRepository = new BackendPokemonRepository();
const backendUniverseRepository = new BackendUniverseRepository();
const localStorageRepository = new LocalStorageRepository();

/**
 * These are the public dependencies of the application.
 */
export const getUniverseEntityByIdAndTypeApplication = new GetUniverseEntityByIdAndTypeApplication(
    backendUniverseRepository,
);
export const setCurrentUniverseApplication = new SetCurrentUniverseTypeApplication(localStorageRepository);
export const getCurrentUniverseApplication = new GetCurrentUniverseTypeApplication(
    localStorageRepository,
    setCurrentUniverseApplication,
);
export const getPokemonDetailByIdApplication = new GetPokemonDetailByIdApplication(backendPokemonRepository);

export const getUniverseEntityByType = new GetUniverseEntityByTypeApplication(backendUniverseRepository);
