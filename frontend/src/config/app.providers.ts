import { BackendUniverseRepository } from '../contexts/universe/infrastructure/backend/backend-universe.repository.ts';
import { GetUniverseEntityByIdAndTypeApplication } from '../contexts/universe/applications/get/entity-by-id-and-type/get-universe-entity-by-id-and-type.application.ts';
import { LocalStorageRepository } from '../contexts/shared/infrastructure/local-storage/local-storage.repository.ts';
import { SetCurrentUniverseTypeApplication } from '../contexts/universe/applications/set/current-universe-type/set-current-universe-type.application.ts';
import { GetCurrentUniverseTypeApplication } from '../contexts/universe/applications/get/current-universe-type/get-current-universe-type.application.ts';
import { BackendPokemonRepository } from '../contexts/pokemon/infrastructure/backend/backend-pokemon.repository.ts';
import { GetPokemonDetailByIdApplication } from '../contexts/pokemon/applications/get/detail-by-id/get-pokemon-detail-by-id.application.ts';
import { GetUniverseEntityByTypeApplication } from '../contexts/universe/applications/get/by-type/get-universe-entity-by-type.application.ts';
import { BackendUserRepository } from '../contexts/shared/infrastructure/backend/backend-user.repository.ts';
import { LoginApplication } from '../contexts/shared/applications/login/login.application.ts';
import { SignupApplication } from '../contexts/shared/applications/signup/signup.application.ts';
import { DeleteUniverseEntityApplication } from '../contexts/universe/applications/delete/delete-universe-entity.application.ts';
import { BackendRickAndMortyRepository } from '../contexts/r&m/infrastructure/backend/backend-rick-and-morty.repository.ts';
import { CreateRickAndMortyCharacterApplication } from '../contexts/r&m/applications/create/create-rick-and-morty-character.application.ts';
import { EditRickAndMortyCharacterApplication } from '../contexts/r&m/applications/edit/edit-rick-and-morty-character.application.ts';
import { CreatePokemonApplication } from '../contexts/pokemon/applications/create/create-pokemon.application.ts';
import { EditPokemonApplication } from '../contexts/pokemon/applications/edit/edit-pokemon.application.ts';

/**
 * This file is used to define the providers of the application.
 */

/**
 * These are the private dependencies of the application.
 */
const backendPokemonRepository = new BackendPokemonRepository();
const backendUniverseRepository = new BackendUniverseRepository();
const backendUserRepository = new BackendUserRepository();
const backendRickAndMortyRepository = new BackendRickAndMortyRepository();
const localStorageRepository = new LocalStorageRepository();

/**
 * These are the public dependencies of the application.
 */
export const loginApplication = new LoginApplication(backendUserRepository, localStorageRepository);
export const registerApplication = new SignupApplication(backendUserRepository);
export const setCurrentUniverseApplication = new SetCurrentUniverseTypeApplication(localStorageRepository);
export const getCurrentUniverseApplication = new GetCurrentUniverseTypeApplication(
    localStorageRepository,
    setCurrentUniverseApplication,
);
export const getUniverseEntityByIdAndTypeApplication = new GetUniverseEntityByIdAndTypeApplication(
    backendUniverseRepository,
);
export const getPokemonDetailByIdApplication = new GetPokemonDetailByIdApplication(backendPokemonRepository);
export const getUniverseEntityByType = new GetUniverseEntityByTypeApplication(backendUniverseRepository);
export const deleteUniverseEntityApplication = new DeleteUniverseEntityApplication(
    backendUniverseRepository,
    localStorageRepository,
);
export const createRickAndMortyCharacterApplication = new CreateRickAndMortyCharacterApplication(
    backendRickAndMortyRepository,
    localStorageRepository,
);
export const editRickAndMortyCharacterApplication = new EditRickAndMortyCharacterApplication(
    backendRickAndMortyRepository,
    localStorageRepository,
);
export const createPokemonApplication = new CreatePokemonApplication(backendPokemonRepository, localStorageRepository);
export const editPokemonApplication = new EditPokemonApplication(backendPokemonRepository, localStorageRepository);
