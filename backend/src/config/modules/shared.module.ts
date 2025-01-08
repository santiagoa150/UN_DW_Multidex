import { Global, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvSchema } from '../env.schema';
import { SequelizeModule } from '@nestjs/sequelize';
import * as process from 'node:process';

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
            logging: Number(process.env.POSTGRES_SHOW_LOGS) ? (sql: string) => { new Logger().debug(sql); } : false,
        })
    ],
    providers: [Logger, ConfigModule],
})
export class SharedModule {}
