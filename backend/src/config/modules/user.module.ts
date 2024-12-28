import { Module } from '@nestjs/common';
import { HttpUserController } from '../../contexts/user/api/http-user.controller';

/**
 * Module for the User context.
 */
@Module({
    controllers: [HttpUserController],
})
export class UserModule {}
