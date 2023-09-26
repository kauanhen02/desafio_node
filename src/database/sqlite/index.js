//importa o banco de dados
const sqlite3 = require("sqlite3")
const sqlite = require("sqlite")
const path = require("path")
//garante que o arquivo do database sera salvo corretamente independente do sistema operacional usado

//se o arquivo de banco de dados não existir ao inciar o servidor ele ira o criar automaticamente. como é algo que não é instantaneo e leva um certo tempo é obrigatorio ter a função "async"

//Em resumo, a função sqliteConnection é usada para abrir uma conexão com um banco de dados SQLite, mas precisa de mais detalhes dentro das chaves para funcionar corretamente.

async function sqliteConnection() {
  const database = await sqlite.open({
    // "path.resolve" ira resolver o modo de salvar em cada sistema operacional, "__dirname" ira verificar onde seu arquivo esta guardado, ".." ira voltar uma pasta e por fim "database.db" esta dando o nome para o arquivo que sera salvo

    filename: path.resolve(__dirname, "..", "database.db"),

    driver: sqlite3.Database,
  })

  return database

  //O return na função sqliteConnection está devolvendo o objeto database que foi criado ao abrir a conexão com o banco de dados SQLite. Esse objeto database contém informações e métodos para interagir com o banco de dados, como executar consultas SQL, inserir dados, etc. Ao retornar esse objeto, a função permite que quem a chame utilize a conexão estabelecida para interagir com o banco de dados.
}

module.exports = sqliteConnection
