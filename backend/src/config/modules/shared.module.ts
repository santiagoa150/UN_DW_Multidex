import { Global, Logger, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from '../env.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenRepository } from '../../contexts/shared/infrastructure/jwt/jwt-token.repository';
import * as process from 'node:process';

/**
 *  `PROVIDERS` is an array of NestJS providers related to shared module.
 */
const PROVIDERS: Provider[] = [Logger, JwtTokenRepository];

/**
 * Shared Configuration Module.
 */
@Global()
@Module({
    imports: [
        CqrsModule.forRoot(),
        JwtModule.register({}),
        ConfigModule.forRoot({
            expandVariables: true,
            isGlobal: true,
            validationSchema: EnvSchema,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            schema: process.env.POSTGRES_SCHEMA,
            autoLoadModels: true,
            synchronize: true,
            logging: Number(process.env.POSTGRES_SHOW_LOGS)
                ? (sql: string) => {
                      new Logger().debug(sql);
                  }
                : false,
        }),
    ],
    providers: [...PROVIDERS],
    exports: [...PROVIDERS],
})
export class SharedModule {}
