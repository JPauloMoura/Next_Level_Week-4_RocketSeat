import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1614135708334 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // criação da tabela
        await queryRunner.createTable(new Table({
            name:'users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                },
                {
                    name: 'created_at', //data de criação
                    type: 'timestamp',
                    default: 'now()',
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // deletar a tabela 'users'
        await queryRunner.dropTable('users')
    }

}
