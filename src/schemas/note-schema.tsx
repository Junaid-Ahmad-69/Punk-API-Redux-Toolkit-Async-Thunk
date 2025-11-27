import Joi from 'joi';

export const noteSchema = Joi.object({
    note: Joi.string()
        .required()
        .messages({
            'string.empty': 'Note is required',
        })
});