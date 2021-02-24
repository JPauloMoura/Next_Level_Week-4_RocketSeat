import { Router } from 'express'
import { UserController } from './controllers/UserController'

const route = Router()

const userController = new UserController()

route.post('/users', userController.create)

export {route}