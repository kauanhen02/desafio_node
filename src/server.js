require("express-async-errors") //importa o express para conseguir tratar e diferenciar os erros

const migrationsRun = require("./database/sqlite/migrations") //importa o migrations para criação da tebela de usuarios

const AppError = require("./utils/AppError") //importa o app erros

const express = require("express") //importa o express

const routes = require("./routes") //importa as rotas

migrationsRun()
//ira executar o banco de dados

const app = express()
app.use(express.json())

app.use(routes)

app.use((error, request, response, next) => {
  //"se o erro for causado pelo cliente retorne um erro"

  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    })
  }

  //se o erro for causado pelo servidor retorne um erro com a message.

  return response.status(500).json({
    status: "error",
    message: "internal server error",
  })

  console.error(error)
})

const PORT = 8888
app.listen(PORT, () => console.log(`server is running on Port ${PORT}`))
