import Joi from 'joi';

/**
 * Joi schema for validating the environment variables used in the API.
 */
export const EnvSchema: Joi.ObjectSchema = Joi.object({
    VITE_APP_PORT: Joi.number().port(),
})
    .options({ presence: 'required' })
    .required();