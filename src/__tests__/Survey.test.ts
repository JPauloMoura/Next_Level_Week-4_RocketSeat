import request from 'supertest'
import { app } from '../app'
import createConnection from '../database'

describe('Survey', () => {

  //função que sera execurtada antes de tudo
  beforeAll(async () => {
    const connection = await createConnection() // criando conexão
    await connection.runMigrations() // rodando as migrations
  })

  it('Criação de pesquisa', async ()=>{
    const response = await request(app) // criação da requisição
      .post('/surveys') // verbo e rota
      .send({         // corpo da requisição
        title: 'gosta de pão',
        description: 'descrição da pesquisa'
      })
    
    expect(response.status).toBe(201)
  })

  it('A quantidade de pesquisas deve ser 2', async ()=>{
    await request(app) // criação da requisição
      .post('/surveys') // verbo e rota
      .send({         // corpo da requisição
        title: 'titulo 2',
        description: 'descrição da outra pesquisa'
      })

    const response = await request(app).get('/surveys')
    
    expect(response.body.length).toBe(2)
    expect(response.body[0]).toHaveProperty('id')
  })

})