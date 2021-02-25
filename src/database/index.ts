import {Connection, createConnection, getConnectionOptions} from 'typeorm'

export default async () : Promise<Connection> => {
  //aqui pegamos as configurações feitas no arquivo 'ormconfig.json'
  const defaultOptions = await getConnectionOptions();

  return createConnection( //verificamos a variavel de ambiente para definir qual banco usar

    //pega um obj e faz a substituição, no caso sera substituido o database
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test' ?
      './src/database/database.test.sqlite' :
      defaultOptions.database
    })
  )
}