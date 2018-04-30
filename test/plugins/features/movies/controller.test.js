'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie, populating name from title', () => {
      const payload = { title: 'Bullitt' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.title);
        expect(movie.get('title')).to.eql(null);
      });
    });

  });

});
