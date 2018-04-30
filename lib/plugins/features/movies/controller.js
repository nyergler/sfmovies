'use strict';

const Movie = require('../../../models/movie');

exports.create = (payload) => {
  const movie_payload = Object.assign({}, payload);
  movie_payload.name = movie_payload.title;
  movie_payload.title = undefined;

  return new Movie().save(movie_payload)
  .then((movie) => new Movie({ id: movie.id }).fetch());
};
