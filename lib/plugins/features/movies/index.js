'use strict';

const Controller           = require('./controller');
const MovieValidator       = require('../../../validators/movies');
const MovieFilterValidator = require('../../../validators/movie_filter');

exports.register = (server, options, next) => {

  server.route([
    {
      method: 'POST',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.create(request.payload));
        },
        validate: {
          payload: MovieValidator
        }
      }
    },
    {
      method: 'GET',
      path: '/movies',
      config: {
        handler: (request, reply) => {
          reply(Controller.findAll(request.query));
        },
        validate: {
          query: MovieFilterValidator
        }
      }
    }
  ]);

  next();
};

exports.register.attributes = {
  name: 'movies'
};
