exports.up = knex => knex.schema.createTable("movie_notes", table => {
  table.increments("id")
  table.text("title")
  table.text("description")
  table.integer("rating")
  table.integer("user_id").references("id").inTable("users");//sem id sem nota, faz com que as notas sejam atreladas ao id do usuario

  table.timestamp("created_at").default(knex.fn.now())
  table.timestamp("updated_at").default(knex.fn.now())
}) 


exports.down = knex => knex.schema.dropTable("movie_notes")
