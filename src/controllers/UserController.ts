import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../models/User'

class UserController {
  async create(req:Request, res:Response){
    try {
      const {name, email} = req.body
     
      const usersRepository = getRepository(User) // criaremos um repositorio com todos os usuarios

      const userAlreadyExists = await usersRepository.findOne({email}) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"

      if(userAlreadyExists){
        return res.status(400).json({
          error: "User already exists!"
        })
      }

      const user = usersRepository.create({ name, email}) //  criaçao de um usuario

      await usersRepository.save(user) // salvando esse usuario

      return res.send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export { UserController }