import { Entity, EntityRepository, Repository } from "typeorm"
import { User } from "../models/User"

// nessa class vamos isolar o Repository
// criamos uma herança. E 'Repository<Entidade>' faz uso de uma entidade, nmo caso 'User'
@EntityRepository(User)
class UsersRepository extends Repository<User> { // 

}

export { UsersRepository }