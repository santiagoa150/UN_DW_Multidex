import { DefaultResponse } from '../../../shared/api/responses/default.response';
import { ApiProperty } from '@nestjs/swagger';

/**
 * `LoginResponse` to provide a standard HTTP response structure for login-related operations.
 */
export class LoginResponse extends DefaultResponse {
    @ApiProperty({ description: 'The access token used for authenticating API requests.' })
    accessToken: string;
}
