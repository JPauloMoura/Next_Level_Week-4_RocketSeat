import { Router } from 'express'
import { SendEmailController } from './controllers/SendEmailController'
import { SurveyController } from './controllers/SurveyController'
import { UserController } from './controllers/UserController'

const route = Router()

const userController = new UserController()
const surveyController = new SurveyController()
const sendEmailController = new SendEmailController()

route.post('/users', userController.create)
route.post('/surveys', surveyController.create)
route.get('/surveys', surveyController.show)
route.post('/sendEmail', sendEmailController.execute)

export {route}