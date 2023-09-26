const config = require("../../../knexfile") //pega as configurações do arquivo knexfile
const knex = require("knex") //importa o knex

const connection = knex(config.development) //cria uma conexão knexcom as configurações da pasta knexfile 

module.exports = connection;