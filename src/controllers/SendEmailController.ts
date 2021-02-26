import { Request, Response } from "express";
import { resolve } from 'path'
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendEmailService from "../services/SendEmailService";

class SendEmailController{
  async execute(req: Request, res: Response){
    const { email, survey_id } = req.body

    //fazendo uso dos repositorio customizado
    const usersRepository = getCustomRepository(UsersRepository)
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    //verificar se o usuario existe
    const userAlreadyExists = await usersRepository.findOne({email})
    if(!userAlreadyExists){
      return res.status(401).json({
        error: 'User does not exists'
      })
    }

    //verificar se a pesquisa existe
    const suveysAlreadyExists = await surveysRepository.findOne({id: survey_id})
    if(!suveysAlreadyExists){
      return res.status(401).json({
        error: 'Survey does not exists'
      })
    }

    // buscando o caminho do arquivo de email
    const npsPath = resolve(__dirname, '..', 'views', 'emails', 'npsMail.hbs') 

    const variables = {
      name: userAlreadyExists.name,
      title: suveysAlreadyExists.title,
      description: suveysAlreadyExists.description,
      user_id: userAlreadyExists.id,
      link: process.env.URL_MAIL
    }

    //verificar se um usuario já possui uma pesquisa cadastrada para ele
    const suveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [{user_id: userAlreadyExists.id}, {value: null}], //filtra todos os usuario pelo id e value passados da tabela surveys_users
      relations: ['user', 'survey'] // retorna as relações da tabela
    })

    // caso essa pesquisa já exista, não precisa cadastrar outra, basta fazer o envio da que já existe
    if(suveyUserAlreadyExists){
      await SendEmailService.execute(email, suveysAlreadyExists.title, variables, npsPath)
      return res.status(201).json(suveyUserAlreadyExists)
    }

    //cria uma nova pesquisa para o usuario
    const surveyUser = surveysUsersRepository.create({user_id: userAlreadyExists.id, survey_id})

    //salvando no banco de dados
    await surveysUsersRepository.save(surveyUser)

    return res.status(201).json(surveyUser)
  }

}

export { SendEmailController };
