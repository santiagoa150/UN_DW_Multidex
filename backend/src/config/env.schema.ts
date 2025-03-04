import * as Joi from 'joi';

export const EnvSchema: Joi.ObjectSchema = Joi.object({
    APP_PORT: Joi.number().port(),
    APP_REST_PREFIX: Joi.string(),
    SWAGGER_PREFIX: Joi.string(),
    POSTGRES_HOST: Joi.string(),
    POSTGRES_PORT: Joi.number().port(),
    POSTGRES_USER: Joi.string(),
    POSTGRES_PASSWORD: Joi.string(),
    POSTGRES_DB: Joi.string(),
    POSTGRES_SHOW_LOGS: Joi.number().valid(0, 1),
    ACCESS_TOKEN_SECRET: Joi.string(),
    ACCESS_TOKEN_EXPIRATION_TIME: Joi.number().integer().min(1),
})
    .options({ presence: 'required' })
    .required();
