'use strict';

const knex = require('../../../../lib/libraries/knex');

const Controller  = require('../../../../lib/plugins/features/movies/controller');
const MovieServer = require('../../../../lib/server');

describe('movieserver integration', () => {

  beforeEach(() => {
    return knex.truncate('movies');
  });

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

  describe('filter', () => {

    beforeEach(() => {
      return Promise.all([
        Controller.create({
          title: 'Bullitt',
          release_year: 1968
        }),
        Controller.create({
          title: 'The Rock',
          release_year: 1996
        }),
        Controller.create({
          title: 'Star Trek IV: The Voyage Home',
          release_year: 1986
        })
      ]);
    });

    it('can filter movies based on title and year', () => {
      return MovieServer.inject({
        url: '/movies?title_contains=Rock&released_after=1900&released_before=1997'
      })
      .then((response) => {
        expect(response.statusCode).to.eql(200);
        expect(response.result.length).to.eql(1);
        expect(response.result[0].object).to.eql('movie');
        expect(response.result[0].title).to.eql('The Rock');
      });
    });

  });

});
