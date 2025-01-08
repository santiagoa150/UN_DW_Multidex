import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { LoginCommand } from '../../../../applications/login/login.command';
import { UserAuthData } from '../../../../domain/user-auth-data';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
    /**
     * @param commandBus - An instance of `CommandBus` used to dispatch authentication commands.
     */
    constructor(private readonly commandBus: CommandBus) {
        super({ usernameField: 'email' });
    }

    /**
     * @param email The user's email address.
     * @param password The user's password.
     */
    async validate(email: string, password: string): Promise<UserAuthData | undefined> {
        return this.commandBus.execute<LoginCommand, UserAuthData | undefined>(new LoginCommand(email, password));
    }
}
