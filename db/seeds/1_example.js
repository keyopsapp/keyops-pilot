exports.seed = function(knex) {
  return knex('example').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('example_id_seq', 1, false);"
      );
    })
    .then(() => {
      return knex('example')
        .insert([
          { name: 'example1' },
          { name: 'example2' },
          { name: 'example3' }
        ])
        .returning('*')
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('example_id_seq', (select max(id) + 1 from example));"
      );
    })
};
