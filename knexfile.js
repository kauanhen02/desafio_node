const path = require("path") //resover caminho dos diretorios independente do sistam operacional

module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      //caminho das pastas
      filename: path.resolve(__dirname, "src", "database", "database.db"),
    },

    // faz com que o delete em cascata funcione!
    poll: {
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb),
    },

    migrations: {
      directory: path.resolve(
        __dirname,
        "src",
        "database",
        "knex",
        "migrations"
      ), //indica onde os novos arquivos devem ser salvos
    },
    useNullAsDefault: true,
  },
}
