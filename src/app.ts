import 'reflect-metadata' //deve ser importado primeiro
import express, { Express, NextFunction, Request, Response } from 'express'
import "express-async-errors"; //deve ser importata abaixo do express
import createConnection from './database'
import { route } from './routes'
import { AppError } from "../src/errors/App.Erros";

createConnection()
const app: Express = express()

app.use(express.json()) // habilitando o express trabalhar com JSON
app.use(route) // arquivo de rotas

//middlew para tratamento de erro
app.use(
  (err: Error, req: Request, res: Response, _next: NextFunction) => {
    // quando for um erro customizado
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        message: err.message,
      });
    }

    // outro tipo de erro
    return res.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app }
