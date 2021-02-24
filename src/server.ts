import 'reflect-metadata' //deve ser importado primeiro
import express, {Express, Request, Response} from 'express'
import './database'
import { route } from './routes'

const app: Express = express()
app.use(express.json()) // habilitando o express trabalhar com JSON
app.use(route) // arquivo de rotas

app.listen(3333, ()=>{
    console.log("---> SERVIDOR RODANDO!!!!")
})