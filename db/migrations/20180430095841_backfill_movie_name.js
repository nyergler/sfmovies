'use strict';

exports.up = function (knex) {
  return knex.raw(
    'UPDATE movies SET name = title WHERE name IS NULL'
  );
};

exports.down = function (knex, Promise) {
  return Promise.resolve();
};
