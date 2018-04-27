'use strict';

const MovieServer = require('../../../../lib/server');

describe('movieserver integration', () => {

  describe('create', () => {

    it('creates a movie', () => {
      return MovieServer.inject({
        url: '/movies',
        method: 'POST',
        payload: { title: 'Volver' }
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.object).to.eql('movie');
      });
    });

  });

});
