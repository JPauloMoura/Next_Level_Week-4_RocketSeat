import { Router } from 'express'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/NpsController'
import { SendEmailController } from './controllers/SendEmailController'
import { SurveyController } from './controllers/SurveyController'
import { UserController } from './controllers/UserController'

const route = Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendEmailController = new SendEmailController()
const answerController = new AnswerController()
const npsController = new NpsController()


route.post('/users', userController.create)
route.post('/surveys', surveyController.create)
route.get('/surveys', surveyController.show)
route.post('/sendEmail', sendEmailController.execute)
route.post('/answers/:value', answerController.execute)
route.get('/nps/:survey_id', npsController.execute)

export {route}