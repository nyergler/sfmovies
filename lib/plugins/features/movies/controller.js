'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  return new Movie().save(payload)
    .then((movie) => new Movie({ id: movie.id }).fetch());
};

exports.findAll = (filter) => {
  return new Movie().query((qb) => {
    if (filter.release_year) {
      if (Array.isArray(filter.release_year)) {
        qb.whereBetween('release_year', filter.release_year);
      } else {
        qb.where({ release_year: filter.release_year });
      }
    }

    if (filter.title) {
      if (filter.title.contains) {
        qb.andWhere('title', 'like', `%${filter.title.contains}%`);
      } else {
        qb.andWhere({ title: filter.title });
      }
    }
  }).fetchAll();
};
