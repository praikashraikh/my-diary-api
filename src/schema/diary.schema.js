const Joi = require('joi');

const diary = Joi.object({
    _id: Joi.number().required(),

    title: Joi.string().required(),
    description: Joi.string().required(),

    createdBy: Joi.string().required(),
    createdDate: Joi.date().default(new Date())
});

module.exports = diary;