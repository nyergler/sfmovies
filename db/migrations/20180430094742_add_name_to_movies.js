'use strict';

exports.up = function (knex) {
  return knex.schema.table('movies', (table) => {
    table.text('name');
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE movies ALTER COLUMN title DROP NOT NULL'
    );
  });
};

exports.down = function (knex) {
  return knex.schema.table('movies', (table) => {
    table.dropColumn('name');
  })
  .then(() => {
    return knex.raw(
      'ALTER TABLE movies ALTER COLUMN title SET NOT NULL'
    );
  });
};
