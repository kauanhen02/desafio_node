const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR,
    email VARCHAR,
    password VARCHAR,
    avatar VARCHAR NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UPDATED_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
`

module.exports = createUsers

//tabela usada para criar usuários, o "INTEGER" ele indica que cada usuário terá um número de id próprio, "PRIMARY KEY" fala que o idsera o identificador primario do usuario e o "AUTOINCREMENT" fara o banco gerar um id automaticamente para cada user