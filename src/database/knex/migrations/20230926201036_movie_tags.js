exports.up = knex =>
  knex.schema.createTable("movie_tags", (table) => {
    table.increments("id")
    table.text("name").notNullable()

    table.integer("note").references("id").inTable("movie_notes").onDelete("CASCADE") //deleta tudo vinculado a esta tag
    table.integer("user_id").references("id").inTable("users") //sem id sem nota, faz com que as notas sejam atreladas ao id do usuario
  })

exports.down = knex => knex.schema.dropTable("movie_tags")
