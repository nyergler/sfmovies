'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'Bullitt' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
      });
    });

    it('populates name from title', () => {
      const payload = { title: 'Bullitt' };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('name')).to.eql(payload.title);
      });
    });

  });

});
