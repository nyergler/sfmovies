'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const movie_payload = Object.assign({}, payload);
  movie_payload.name = movie_payload.title;

  return new Movie().save(movie_payload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.findAll = (filter) => {
  return new Movie().query((qb) => {
    if (filter.release_year) {
      qb.where({ release_year: filter.release_year });
    }
    if (filter.released_after) {
      qb.where('release_year', '>', filter.released_after);
    }
    if (filter.released_before) {
      qb.where('release_year', '<', filter.released_before);
    }

    if (filter.title) {
      qb.where({ title: filter.title });
    }

    if (filter.title_contains) {
      qb.where('title', 'ilike', `%${filter.title_contains}%`);
    }
  }).fetchAll();
};
