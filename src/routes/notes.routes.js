const { Router } = require("express")

const NotesController = require("../controllers/NotesController")

const notesRoutes = Router()

const notesController = new NotesController()

//para ativar o "myMiddleware" seria necessario adicionar um ",myMiddleware" na linha abaixo

notesRoutes.post("/:user_id", notesController.create) //rota do create users para criar usuarios

module.exports = notesRoutes
