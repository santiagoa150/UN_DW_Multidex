import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from '../env.schema';

/**
 * Shared Configuration Module.
 */
@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
            validationSchema: EnvSchema,
        }),
    ],
    providers: [Logger, ConfigModule],
})
export class SharedModule {}
