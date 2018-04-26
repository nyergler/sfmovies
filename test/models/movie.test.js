'use strict';

const Movie = require('../../lib/models/movie');

describe('movie model', () => {

  describe('serialize', () => {

    it('includes all required fields', () => {
      const movie = Movie.forge().serialize();
      expect(movie).to.have.all.keys([
        'id',
        'title',
        'release_year',
        'object'
      ]);
    });

  });

});
