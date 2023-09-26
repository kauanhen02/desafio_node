const { Router } = require("express")

const UsersControllers = require("../controllers/UsersControllers")

const usersRoutes = Router()

//ele ira verificar o usuario antes de executar o cadastro, no caso caso isAdmin seja igual a "false" ira retornar negado, caso seja "true" ira retornar os dados
// function myMiddleware(request, response, next) {
//   if (!request.body.isAdmin) {
//     return response.json({ message: "negado" })
//   }

//   next() //serve para dar sequencia no Middleware, sem ele a execução ficara travada e ocasionara em erro de tempo excedido 
// }

const userController = new UsersControllers()

//para ativar o "myMiddleware" seria necessario adicionar um ",myMiddleware" na linha abaixo

usersRoutes.post("/", userController.create) //rota do create users para criar usuarios
usersRoutes.put("/:id", userController.update) //rota do create users para atualizar usuarios

module.exports = usersRoutes