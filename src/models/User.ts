import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('users') //tabela do banco de dados
class User{

  constructor(){  // quando um usuario for criado ele recebera um uuid
    if(!this.id){
      this.id = uuid()
    }
  }

  @PrimaryColumn() //chave primaria
  readonly id: string   // esse id sera somente leitura

  @Column()    //ou  | @Column('name')
  name: string //    | nameUser: string

  @Column()
  email: string

  @CreateDateColumn() //coluna do tipo Date
  created_at: Date
}

export { User }