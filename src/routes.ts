import { Router } from 'express'
import { SurveyController } from './controllers/SurveyController'
import { UserController } from './controllers/UserController'

const route = Router()

const userController = new UserController()
const surveyController = new SurveyController()

route.post('/users', userController.create)
route.post('/surveys', surveyController.create)
route.get('/surveys', surveyController.show)

export {route}