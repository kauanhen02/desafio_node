const knex = require("../database/knex") // Importa o knex

class NotesController {
  async create(request, response) {
    const { title, description, rating, name } = request.body // Captura essas informações do que for posto pelo usuário
    const { user_id } = request.params // Captura o id do usuário

    // Ira cadastrar a nota com um id próprio vinculado ao user id
    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    })

    // Fará o cadastro das tags que o usuário colocar
    const tags = [{ note_id, user_id, name }] // Corrigido: Utilize a variável note_id corretamente

    await knex("tags").insert(tags)

    response.json({})
  }
}

module.exports = NotesController
