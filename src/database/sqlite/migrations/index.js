const sqliteConnection = require("../../sqlite") // importa o banco

const createUsers = require("./createUsers") //importa o create users

async function migrationsRun() {
  const schemas = [createUsers].join("")

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error))
}

module.exports = migrationsRun

//Em resumo, a função migrationsRun é uma função assíncrona que executa migrações de banco de dados (especificamente a criação de tabelas de usuários) usando as funções e objetos importados do SQLite. ela executa o createUsers e automatiza a criação de tabelas caso necessario.
