import 'reflect-metadata' //deve ser importado primeiro
import express, {Express, Request, Response} from 'express'
import './database'

const app: Express = express()

app.get('/', (req: Request, res: Response)=>{
    res.send("ok")
})

app.listen(3333, ()=>{
    console.log("---> SERVIDOR RODANDO!!!!")
})