import 'reflect-metadata' //deve ser importado primeiro
import express, { Express } from 'express'
import createConnection from './database'
import { route } from './routes'

createConnection()
const app: Express = express()

app.use(express.json()) // habilitando o express trabalhar com JSON
app.use(route) // arquivo de rotas

export { app }
