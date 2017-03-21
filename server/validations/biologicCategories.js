const Joi = require('joi');

module.exports = {
  create: Joi.object().keys({
    created_at: Joi.date(),
    updated_at: Joi.date(),
    can_be_product: Joi.boolean(),
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    parent_id: Joi.number()
      .integer()
      .allow(null),
    parent_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .allow(null)
  }),
  update: Joi.object().keys({
    created_at: Joi.date(),
    updated_at: Joi.date(),
    can_be_product: Joi.boolean(),
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30),
    parent_id: Joi.number()
      .integer()
      .allow(null),
    parent_name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .allow(null)
  })
}
