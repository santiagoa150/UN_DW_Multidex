import * as Joi from 'joi';

export const EnvSchema: Joi.ObjectSchema = Joi.object({
    APP_PORT: Joi.number().port(),
})
    .options({ presence: 'required' })
    .required();
