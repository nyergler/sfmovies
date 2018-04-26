'use strict';

const Movies = require('./data/movies');

exports.seed = (knex) => {
  return knex('movies').truncate()
  .then(() => {
    return knex('movies').insert(Movies);
  });
};
