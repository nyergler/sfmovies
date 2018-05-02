'use strict';

const Joi = require('joi');

const MovieFilterValidator = require('../../lib/validators/movie_filter');

describe('movie filter validator', () => {

  it('validates an empty filter', () => {
    const empty_payload = {};
    const result = Joi.validate(empty_payload, MovieFilterValidator);

    expect(result.error).to.be.eql(null);
  });

  it('limits the title to 255 characters', () => {
    const payload = {
      title: '01234567890123456789012345678901234567890123456789' +
        '01234567890123456789012345678901234567890123456789' +
        '01234567890123456789012345678901234567890123456789' +
        '01234567890123456789012345678901234567890123456789' +
        '01234567890123456789012345678901234567890123456789' +
        '01234567890123456789012345678901234567890123456789'
    };
    const result = Joi.validate(payload, MovieFilterValidator);

    expect(result.error.details[0].path[0]).to.eql('title');
    expect(result.error.details[0].type).to.eql('string.max');
  });

  it('allows fuzzy matching on title', () => {
    const payload = {
      title_contains: 'substring'
    };
    const result = Joi.validate(payload, MovieFilterValidator);

    expect(result.error).to.eql(null);
    expect(result.value).to.eql(payload);
  });

  it('does not allow specifying title and title_contains', () => {
    const payload = {
      title: 'Foo',
      title_contains: 'Foo'
    };
    const result = Joi.validate(payload, MovieFilterValidator);

    expect(result.error).to.not.eql(null);
  });

  it('can take a specific release year between 1878 and 9999', () => {
    const payload = {
      release_year: 1876
    };
    const result = Joi.validate(payload, MovieFilterValidator);

    expect(result.error.details[0].path[0]).to.eql('release_year');
    expect(result.error.details[0].type).to.eql('number.min');
  });

  it('can take a release year range', () => {
    const payload = {
      released_after: 1900,
      released_before: 1950
    };
    const result = Joi.validate(payload, MovieFilterValidator);

    expect(result.error).to.eql(null);
    expect(result.value).to.eql(payload);
  });

});
