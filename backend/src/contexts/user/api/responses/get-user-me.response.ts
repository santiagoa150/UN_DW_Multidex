import { DefaultResponse } from '../../../shared/api/responses/default.response';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { HttpUserModel } from '../models/http-user.model';

/**
 * `GetMeResponseData` to provide a standard HTTP response structure for the get me operation.
 */
class GetMeResponseData extends OmitType(HttpUserModel, ['password']) {}

/**
 * `GetUserMeResponse` to provide a standard HTTP response structure for the get me operation.
 */
export class GetUserMeResponse extends DefaultResponse {
    @ApiProperty({ description: 'The user found.', type: GetMeResponseData })
    user: GetMeResponseData;
}
