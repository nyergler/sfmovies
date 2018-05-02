'use strict';

const Joi = require('joi');

const JoiReleaseYear = Joi.number().integer().min(1878).max(9999);

module.exports = Joi.object().keys({
  title: Joi.string().min(1).max(255).optional(),
  title_contains: Joi.when(
    'title',
    {
      is: Joi.exist(),
      then: Joi.forbidden(),
      otherwise: Joi.string().min(1).max(255).optional()
    }
  ),
  release_year: JoiReleaseYear.optional(),
  released_after: JoiReleaseYear.optional(),
  released_before: JoiReleaseYear.optional()
});
