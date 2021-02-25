import { Request, Response } from "express";
import { getCustomRepository, getRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

class SurveyController{
  async create(req: Request, res: Response){
    const { title, description } = req.body

    //fazer uso do repositorio customizado de pesquisa
    const surveysRepository = getCustomRepository(SurveysRepository)

    //criando esse novo dado p/ inserir no banco
    const survey = surveysRepository.create({title, description})

    //salvando no banco de dados
    await surveysRepository.save(survey)

    return res.status(201).json(survey)
  }

  //listar as pesquisas
  async show(req: Request, res: Response){
    const surveysRepository = getCustomRepository(SurveysRepository)
    const all = await surveysRepository.find()

    return res.status(200).json(all)
  }
}

export { SurveyController }