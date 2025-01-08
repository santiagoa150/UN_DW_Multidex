import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO (Data Transfer Object) that represents the payload for a login request.
 */
export class LoginRequest {
    @ApiProperty({ description: "The user's email address." })
    email: string;

    @ApiProperty({ description: 'The user password.' })
    password: string;
}
