import {MigrationInterface, PrimaryColumn, QueryRunner, Table} from "typeorm";

//tabela/migration de busca de usuario
export class CreateSurverys1614212271538 implements MigrationInterface {

    //cração da tabela
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'surveys',
            //esses tipos são de acordo com o banco de dadod
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'title',
                    type: 'vachar',
                },
                {
                    name: 'description',
                    type: 'string',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    //metodo para dropa a tabela
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("surveys")
    }

}
