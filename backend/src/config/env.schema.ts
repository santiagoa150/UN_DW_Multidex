import * as Joi from 'joi';

export const EnvSchema: Joi.ObjectSchema = Joi.object({
    APP_PORT: Joi.number().port(),
    APP_REST_PREFIX: Joi.string(),
    SWAGGER_PREFIX: Joi.string(),
    POSTGRES_USER: Joi.string(),
})
    .options({ presence: 'required' })
    .required();
