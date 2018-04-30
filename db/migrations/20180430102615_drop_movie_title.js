'use strict';

exports.up = function (knex) {
  return knex.table('movies', (table) => {
    return table.dropColumn('title');
  })
    .then(() => {
      return knex.raw(
        'ALTER TABLE movies ALTER COLUMN name SET NOT NULL'
      );
    });
};

exports.down = function (knex) {
  return knex.table('movies', (table) => {
    return table.text('title');
  })
    .then(() => {
      return knex.raw(
        'UPDATE movies SET title = name WHERE title IS NULL'
      );
    })
    .then(() => {
      return knex.raw(
        'ALTER TABLE movies ALTER COLUMN name DROP NOT NULL'
      );
    });
};
