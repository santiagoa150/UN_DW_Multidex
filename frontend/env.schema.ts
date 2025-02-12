import Joi from 'joi';
import { EnvironmentConstants } from './src/contexts/shared/domain/constants/environment.constants.ts';

/**
 * Joi schema for validating the environment variables used in the API.
 */
export const EnvSchema: Joi.ObjectSchema = Joi.object({
    VITE_APP_PORT: Joi.number().port(),
    VITE_ENVIRONMENT: Joi.string().valid(...Object.values(EnvironmentConstants)),
    VITE_BACKEND_BASE_URL: Joi.string().uri(),
})
    .options({ presence: 'required' })
    .required();
