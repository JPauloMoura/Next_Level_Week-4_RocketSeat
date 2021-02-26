import { EntityRepository, Repository } from 'typeorm';
import { SurveyUser } from  '../models/Surveys_Users'

// nessa class vamos isolar o Repository
// criamos uma herança. E 'Repository<Entidade>' faz uso de uma entidade, nmo caso 'SurveyUser'
@EntityRepository(SurveyUser)
class SurveysUsersRepository extends Repository<SurveyUser> {

}

export { SurveysUsersRepository }