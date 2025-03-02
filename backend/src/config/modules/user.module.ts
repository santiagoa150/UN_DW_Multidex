import { Module, Provider, Type } from '@nestjs/common';
import { HttpUserController } from '../../contexts/user/api/http-user.controller';
import { LocalAuthStrategy } from '../../contexts/user/infrastructure/nestjs/guards/local/local-auth.strategy';
import { ICommandHandler, IQueryHandler, QueryBus } from '@nestjs/cqrs';
import { LoginCommandHandler } from '../../contexts/user/applications/login/login.command-handler';
import { SequelizeModule } from '@nestjs/sequelize';
import { PgUserModel } from '../../contexts/user/infrastructure/postgres/pg-user.model';
import { PgUserRepository } from '../../contexts/user/infrastructure/postgres/pg-user.repository';
import { LoginApplication } from '../../contexts/user/applications/login/login.application';
import { GetUserByEmailQueryHandler } from '../../contexts/user/applications/get/by-email/get-user-by-email.query-handler';
import { GetUserByEmailApplication } from '../../contexts/user/applications/get/by-email/get-user-by-email.application';
import { UserRepository } from '../../contexts/user/domain/interfaces/user.repository';
import { CreateUserAccessTokenCommandHandler } from '../../contexts/user/applications/access-token/create/create-user-access-token.command-handler';
import { JwtTokenRepository } from '../../contexts/shared/infrastructure/jwt/jwt-token.repository';
import { CreateUserAccessTokenApplication } from '../../contexts/user/applications/access-token/create/create-user-access-token.application';
import { TokenRepository } from '../../contexts/shared/domain/interfaces/token.repository';
import { ValidateUserAccessTokenApplication } from '../../contexts/user/applications/access-token/validate/validate-user-access-token.application';
import { ValidateUserAccessTokenQueryHandler } from '../../contexts/user/applications/access-token/validate/validate-user-access-token.query-handler';
import { SignUpCommandHandler } from '../../contexts/user/applications/sign-up/sign-up.command-handler';
import { SignUpApplication } from '../../contexts/user/applications/sign-up/sign-up.application';

/**
 * `PROVIDERS` is an array of NestJS providers related to user module.
 */
const PROVIDERS: Provider[] = [PgUserRepository, LocalAuthStrategy];

/**
 * `APPLICATIONS` is an array of applications related to user module.
 */
const APPLICATIONS: Provider[] = [
    {
        inject: [PgUserRepository],
        provide: GetUserByEmailApplication,
        useFactory: (repository: UserRepository): GetUserByEmailApplication => {
            return new GetUserByEmailApplication(repository);
        },
    },
    {
        inject: [QueryBus],
        provide: LoginApplication,
        useFactory: (queryBus: QueryBus): LoginApplication => {
            return new LoginApplication(queryBus);
        },
    },
    {
        inject: [JwtTokenRepository],
        provide: CreateUserAccessTokenApplication,
        useFactory: (repository: TokenRepository): CreateUserAccessTokenApplication => {
            return new CreateUserAccessTokenApplication(repository);
        },
    },
    {
        inject: [JwtTokenRepository],
        provide: ValidateUserAccessTokenApplication,
        useFactory: (repository: TokenRepository): ValidateUserAccessTokenApplication => {
            return new ValidateUserAccessTokenApplication(repository);
        },
    },
    {
        inject: [QueryBus, PgUserRepository],
        provide: SignUpApplication,
        useFactory: (queryBus: QueryBus, repository: UserRepository): SignUpApplication => {
            return new SignUpApplication(queryBus, repository);
        },
    },
];

/**
 * `QUERIES` is an array of query handlers related to user module.
 */
const QUERIES: Type<IQueryHandler>[] = [GetUserByEmailQueryHandler, ValidateUserAccessTokenQueryHandler];

/**
 * `COMMANDS` is an array of command handlers related to user module.
 */
const COMMANDS: Type<ICommandHandler>[] = [
    LoginCommandHandler,
    CreateUserAccessTokenCommandHandler,
    SignUpCommandHandler,
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
