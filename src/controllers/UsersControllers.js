const { hash, compare } = require("bcryptjs") //importa o bcrypt para criptografar a senha do usuario e o compare para a troca de senha

const AppError = require("../utils/AppError")

const sqliteConnection = require("../database/sqlite") // importa o banco

class UsersControllers {
  //criar um usuario
  async create(request, response) {
    const { name, email, password } = request.body

    //ira verificar se o e-mail ja esta cadastrado
    const database = await sqliteConnection()
    const checkUserExiste = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    )

    //se o e-mail ja exisitr emitir um novo erro
    if (checkUserExiste) {
      throw new AppError("Este e-mail esta em uso!")
    }

    //chama a função hash, após chamar esta função identificamos o parametro que queremos criptografar no caso o "password" e o nivel de complexibilidade

    const hashedPasswod = await hash(password, 8) //o await serve para esperar que o usuario seja cadastrado para que assim sim possa criptografar a senha

    //faz com que os dados sejam adicionados no banco de dados
    await database.run(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPasswod]
    )

    //se não existir seguir em frente e aprensetar status 201 de criado
    return response.status(201).json()
  }

  // atualizar dados de um usuario
  async update(request, response) {
    const { name, email, password, old_password } = request.body //esta capturando o nome e o email do usuario
    const { id } = request.params //esta capturando o id do usuario

    const database = await sqliteConnection() //estabelece conexão com o banco
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]) //busca o usuario que esta fazendo a alteração pelo id

    if (!user) {
      throw new AppError("Usuário não encontrado")
    } //verifica se o usuario existe

    const userWithUpdatedEmail = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    ) //busca o e-mail no banco que vai ser alterado

    //se o email novo for = um email de um id diferente emita um erro
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError("Este e-mail já está em uso.")
    } // verifica se o e-mail novo ja esta em uso

    user.name = name ?? user.name //captura o novo nome e altera
    user.email = email ?? user.email //captura o novo email e altera

    if (password && !old_password) {
      throw new AppError(
        "Você informar a senha antiga para definir a nova senha"
      )
    } //se não informar a senha antiga ira apresentar erro

    if (password && old_password) {
      // se as duas senhas forem informadas ele ira comparar a senha atual com a criptografada
      const checkOldPassword = await compare(old_password, user.password)

      // verifica se a senha antiga esta correta
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere.")
      } 

      // verifica se a nova senha é igual a antiga
      if (password === old_password) {
        throw new AppError("Você não pode cadastrar uma senha igual a antiga!")
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME ('now'),
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )
    //atualiza no banco os dados

    return response.status(200).json() // apresenta status de criado
  }
}

module.exports = UsersControllers
