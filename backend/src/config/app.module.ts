import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared.module';
import { UserModule } from './modules/user.module';
import { UniverseModule } from './modules/universe.module';

/**
 * Main application module.
 */
@Module({
    imports: [SharedModule, UserModule, UniverseModule],
})
export class AppModule {}
