import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared.module';
import { UserModule } from './modules/user.module';

/**
 * Main application module.
 */
@Module({
    imports: [SharedModule, UserModule],
})
export class AppModule {}
