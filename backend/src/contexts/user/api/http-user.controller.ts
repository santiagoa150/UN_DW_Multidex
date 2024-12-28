import { Controller } from '@nestjs/common';
import { HttpUserConstants } from './http-user.constants';
import { ApiTags } from '@nestjs/swagger';

/**
 * Controller for the User HTTP API.
 */
@Controller(HttpUserConstants.PREFIX)
@ApiTags(HttpUserConstants.API_TAG)
export class HttpUserController {}
