import { ApiProperty } from '@nestjs/swagger';

/**
 * DefaultResponse represents a standardized response structure for HTTP requests.
 */
export class DefaultResponse {
    @ApiProperty({ type: Boolean })
    public readonly success: boolean = true;
}
