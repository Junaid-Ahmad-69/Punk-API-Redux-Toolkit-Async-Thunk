import Joi from 'joi';

export const loginSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } }) // Disallows fake TLDs
        .required()
        .messages({
            'string.empty': 'Email is required',
            'string.email': 'Please enter a valid email address'
        }),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])'))
        .required()
        .messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
        })
});