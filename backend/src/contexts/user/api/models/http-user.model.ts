import { UserDto } from '../../infrastructure/user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserExceptionMessagesConstants } from '../../domain/exceptions/user-exception-messages.constants';

/**
 * HTTP model for the user.
 */
export class HttpUserModel implements Omit<UserDto, 'password'> {
    @ApiProperty({ description: 'The user ID.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_ID_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_ID_IS_REQUIRED })
    userId: string;

    @ApiProperty({ description: 'The user email.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_EMAIL_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_EMAIL_IS_REQUIRED })
    email: string;

    @ApiProperty({ description: 'The user username.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_USERNAME_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_USERNAME_IS_REQUIRED })
    username: string;

    @ApiProperty({ description: 'The user names.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_NAMES_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_NAMES_IS_REQUIRED })
    names: string;

    @ApiProperty({ description: 'The user last names.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_LAST_NAMES_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_LAST_NAMES_IS_REQUIRED })
    lastNames: string;

    @ApiProperty({ description: 'The user password.' })
    @IsString({ message: UserExceptionMessagesConstants.USER_PASSWORD_MUST_BE_A_STRING })
    @IsNotEmpty({ message: UserExceptionMessagesConstants.USER_PASSWORD_IS_REQUIRED })
    password: string;
}
