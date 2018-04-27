'use strict';

const knex = require('../../../../lib/libraries/knex');

const Controller = require('../../../../lib/plugins/features/movies/controller');

describe('movie controller', () => {

  beforeEach(() => {
    return knex.truncate('movies');
  });

  describe('create', () => {

    it('creates a movie', () => {
      const payload = { title: 'Bullet' };

      return Controller.create(payload)
        .then((movie) => {
          expect(movie.get('title')).to.eql(payload.title);
        });
    });

  });

  describe('findAll', () => {

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

    it('returns all movies with no filters', () => {
      return Controller.findAll({})
        .then((result) => {
          expect(result.length).to.eql(3);
        });
    });

    it('allows filtering by year', () => {
      return Controller.findAll({ release_year: 1986 })
        .then((result) => {
          expect(result.length).to.eql(1);
          expect(result.models[0].attributes.title).to.eql('Star Trek IV: The Voyage Home');
        });
    });

    it('allows filtering by a range of years', () => {
      return Controller.findAll({ release_year: [1986, 1996] })
        .then((result) => {
          expect(result.length).to.eql(2);
          expect(result.models.map((r) => r.attributes.title)).to.include.members([
            'Star Trek IV: The Voyage Home',
            'The Rock'
          ]);
        });
    });

    it('allows filtering by title', () => {
      return Controller.findAll({ title: 'Bullitt' })
        .then((result) => {
          expect(result.length).to.eql(1);
          expect(result.models[0].attributes.title).to.eql('Bullitt');
        });
    });

    it('supports fuzzy title search', () => {
      return Controller.findAll({ title: { contains: 'o' } })
        .then((result) => {
          expect(result.length).to.eql(2);
          expect(result.models.map((r) => r.attributes.title)).to.include.members([
            'Star Trek IV: The Voyage Home',
            'The Rock'
          ]);
        });
    });

  });

});
