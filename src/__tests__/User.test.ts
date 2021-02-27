import request from 'supertest'
import { getConnection } from 'typeorm'
import { app } from '../app'
import createConnection from '../database'

describe('User', () => {

  //função que sera execurtada antes de tudo
  beforeAll(async () => {
    const connection = await createConnection() // criando conexão
    await connection.runMigrations() // rodando as migrations
  })

  //função que sera executada após os teste
  afterAll(async() => {
    const connection =  getConnection()
    await connection.dropDatabase() // deleta o banco de teste
    await connection.close() // fecha a conexão
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