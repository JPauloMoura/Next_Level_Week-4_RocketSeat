import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('surveys')//tabela do banco de dados
class Survey {
  constructor(){
    if(!this.id){ // quando um usuario for criado ele recebera um uuid
      this.id = uuid()
    }
  }

  @PrimaryColumn() // chave primaria
  readonly id: string // esse id sera somente leitura

  @Column()
  title: string

  @Column()
  description: string
  
  @CreateDateColumn()
  created_at: Date
}

export { Survey }