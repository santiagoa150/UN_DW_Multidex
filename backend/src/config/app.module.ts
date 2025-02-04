import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared.module';
import { UserModule } from './modules/user.module';
import { UniverseModule } from './modules/universe.module';
import { PokemonModule } from './modules/pokemon.module';
import { RickAndMortyModule } from './modules/rick-and-morty.module';

/**
 * Main application module.
 */
@Module({
    imports: [SharedModule, UserModule, UniverseModule, PokemonModule, RickAndMortyModule],
})
export class AppModule {}
