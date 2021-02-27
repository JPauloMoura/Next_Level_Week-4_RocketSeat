import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'
import { AppError } from '../errors/App.Erros'

class UserController {
  async create(req:Request, res:Response){
    try {
      const {name, email} = req.body

      //criando uma validação com o Yup
      const schema = yup.object().shape({
        name: yup.string().required(),
        email: yup.string().email().required(),
      });
  
      try {
        //{ abortEarly: false } faz todas as validações
        await schema.validate(req.body, { abortEarly: false });
      } catch (err) {
        throw new AppError(err);
      }

      const usersRepository = getCustomRepository(UsersRepository) // faremos uso do nosso repositorio customizado

      const userAlreadyExists = await usersRepository.findOne({email}) // SELECT * FROM USERS WHERE EMAIL = "EMAIL"

      if(userAlreadyExists){
        throw new AppError('User already exists!')
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
