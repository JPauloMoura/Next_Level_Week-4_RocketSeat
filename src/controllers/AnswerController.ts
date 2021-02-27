import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/App.Erros";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";

//pegando resposta do usuario e salvando no banco
class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

    //verificar se o parm 'u' existe no banco
    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser);
  }
}

export { AnswerController };
