import { EntityRepository, Repository } from "typeorm"
import { Survey } from "../models/Survey"

// nessa class vamos isolar o Repository
// criamos uma herança. E 'Repository<Entidade>' faz uso de uma entidade, nmo caso 'Survey'
@EntityRepository(Survey)
class SurveysRepository extends Repository<Survey>{

}

export { SurveysRepository }