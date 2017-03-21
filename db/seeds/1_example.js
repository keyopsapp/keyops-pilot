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
          { name: 'John' },
          { name: 'Paul' },
          { name: 'George' },
          { name: 'Ringo' }
        ])
        .returning('*')
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('example_id_seq', (select max(id) + 1 from example));"
      );
    })
};
