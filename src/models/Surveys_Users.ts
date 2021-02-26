import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from 'uuid'
import { Survey } from "./Survey";
import { User } from "./User";

@Entity('surveys_users') //essa tabela e chamada de  'pivo', pois possui ro relacionamento entre duas tabelas
class SurveyUser{

  constructor(){  // quando um usuario for criado ele recebera um uuid
    if(!this.id){
      this.id = uuid()
    }
  }

  @PrimaryColumn() //chave primaria
  readonly id: string   // esse id sera somente leitura

  @Column()    //ou  | @Column('name')
  user_id: string //    | nameUser: string

  @ManyToOne(()=> User) // relacionamento N:N -> um usuarios com varias pesquisas, e uma pesquisa varios usuarios
  @JoinColumn({name: 'user_id'}) // faz um join com a tabela User, usando o user_id
  user: User

  @Column()
  survey_id: string

  @ManyToOne(()=> Survey) // relacionamento N:N -> um usuarios com varias pesquisas, e uma pesquisa varios usuarios
  @JoinColumn({name: 'survey_id'}) // faz um join com a tabela User, usando o user_id
  survey: Survey

  @Column()
  value: number

  @CreateDateColumn() //coluna do tipo Date
  created_at: Date
}

export { SurveyUser }