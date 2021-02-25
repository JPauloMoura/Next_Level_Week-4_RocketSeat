import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

class UserController {
  async create(req:Request, res:Response){
    try {
      const {name, email} = req.body

      const usersRepository = getCustomRepository(UsersRepository) // faremos uso do nosso repositorio customizado

      const userAlreadyExists = await usersRepository.findOne({email}) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"

      if(userAlreadyExists){
        return res.status(400).json({
          error: "User already exists!"
        })
      }

      const user = usersRepository.create({ name, email}) //  criaçao de um usuario

      await usersRepository.save(user) // salvando esse usuario

      return res.status(201).send(user)
    } catch (error) {
      res.status(400).send(error.message)
    }
  }
}

export { UserController }
