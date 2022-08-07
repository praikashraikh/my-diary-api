const Joi = require('joi');

const userSchema = Joi.object({
    _id: Joi.number().required(),
    username: Joi.string().min(3).max(10).required(),
    password: Joi.string().required(),
    fullname: Joi.string().required(),
    email: Joi.string()
});

module.exports = userSchema;