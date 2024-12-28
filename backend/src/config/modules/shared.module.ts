import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

/**
 * Shared Configuration Module.
 */
@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
        }),
    ],
    providers: [Logger, ConfigModule],
})
export class SharedModule {}
