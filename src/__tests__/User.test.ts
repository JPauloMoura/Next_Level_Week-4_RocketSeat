import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe('User', () => {

  //função que sera execurtada antes de tudo
  beforeAll(async () => {
    const connection = await createConnection() // criando conexão
    await connection.runMigrations() // rodando as migrations
  })

  it('Criação de usuario', async ()=>{
    const response = await request(app) // criação da requisição
      .post('/users') // verbo e rota
      .send({         // corpo da requisição
        email: 'meu@gmail.com',
        name: 'meuNome'
      })
    
    expect(response.status).toBe(201)
  })

  it('Proibir criação de usuario com mesmo email', async ()=>{
    const response = await request(app) // criação da requisição
      .post('/users') // verbo e rota
      .send({         // corpo da requisição
        email: 'meu@gmail.com',
        name: 'meuNome'
      })
    
    expect(response.status).toBe(400)
  })

})