import { Logger, Module, Provider, Type } from '@nestjs/common';
import { HttpUserController } from '../../contexts/user/api/http-user.controller';
import { LocalAuthStrategy } from '../../contexts/user/infrastructure/nestjs/guards/local/local-auth.strategy';
import { CommandBus, ICommandHandler, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { LoginCommandHandler } from '../../contexts/user/applications/login/login.command-handler';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgUserModel } from '../../contexts/user/infrastructure/postgres/pg-user.model';
import { PgUserRepository } from '../../contexts/user/infrastructure/postgres/pg-user.repository';
import { LoginApplication } from '../../contexts/user/applications/login/login.application';
import { GetUserByEmailQueryHandler } from '../../contexts/user/applications/get/by-email/get-user-by-email.query-handler';
import { GetUserByEmailApplication } from '../../contexts/user/applications/get/by-email/get-user-by-email.application';
import { UserRepository } from '../../contexts/user/domain/interfaces/user.repository';
import { CreateUserPasswordApplication } from '../../contexts/user/applications/create/password/create-user-password.application';
import { CreateUserPasswordCommandHandler } from '../../contexts/user/applications/create/password/create-user-password.command-handler';
import { CreateUserAccessTokenCommandHandler } from '../../contexts/user/applications/create/access-token/create-user-access-token.command-handler';
import { JwtTokenRepository } from '../../contexts/shared/infrastructure/jwt/jwt-token.repository';
import { CreateUserAccessTokenApplication } from '../../contexts/user/applications/create/access-token/create-user-access-token.application';
import { TokenRepository } from '../../contexts/shared/domain/interfaces/token.repository';

/**
 * `PROVIDERS` is an array of NestJS providers related to user module.
 */
const PROVIDERS: Provider[] = [PgUserRepository, LocalAuthStrategy];

/**
 * `APPLICATIONS` is an array of applications related to user module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [Logger, PgUserRepository],
        provide: GetUserByEmailApplication,
        useFactory: (logger: Logger, repository: UserRepository): GetUserByEmailApplication => {
            return new GetUserByEmailApplication(logger, repository);
        },
    },
    {
        provide: CreateUserPasswordApplication,
        useClass: CreateUserPasswordApplication,
    },
    {
        inject: [Logger, QueryBus, CommandBus],
        provide: LoginApplication,
        useFactory: (logger: Logger, queryBus: QueryBus, commandBus: CommandBus): LoginApplication => {
            return new LoginApplication(logger, queryBus, commandBus);
        },
    },
    {
        inject: [Logger, JwtTokenRepository],
        provide: CreateUserAccessTokenApplication,
        useFactory: (logger: Logger, repository: TokenRepository): CreateUserAccessTokenApplication => {
            return new CreateUserAccessTokenApplication(logger, repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to user module.
 */
const QUERIES: Type<IQueryHandler>[] = [GetUserByEmailQueryHandler];

/**
 * `COMMANDS` is an array of command handlers related to user module.
 */
const COMMANDS: Type<ICommandHandler>[] = [
    LoginCommandHandler,
    CreateUserPasswordCommandHandler,
    CreateUserAccessTokenCommandHandler,
];

/**
 * Module for the User context.
 */
@Module({
    controllers: [HttpUserController],
    imports: [SequelizeModule.forFeature([PgUserModel])],
    providers: [...PROVIDERS, ...APPLICATIONS, ...QUERIES, ...COMMANDS],
})
export class UserModule {}
