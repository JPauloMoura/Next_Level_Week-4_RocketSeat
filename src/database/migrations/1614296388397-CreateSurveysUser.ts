import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSurveysUser1614296388397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        
        await queryRunner.createTable(new Table({
            name:'surveys_users',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'uuid',
                },
                {
                    name: 'survey_id',
                    type: 'uuid',
                },
                {
                    name: 'value',
                    type: 'number',
                    isNullable: true, //quando for criada a tabela esse campo sera nulo, assim não dará ERRO
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
            foreignKeys: [ // declarando nossas chaves estrangeira
                {
                    name: 'FKuser', 
                    referencedTableName: 'users', // tabela referenciada
                    referencedColumnNames: ['id'], // coluna ad tabela acima referenciada
                    columnNames: ['user_id'], //coluna dessa tabela que faz referencia
                    onDelete: 'CASCADE', // caso a tabela referenciada aqui, sofra modificação, aqui tambem sera
                    onUpdate: 'CASCADE'
                },
                {
                    name: 'FKsurvey', 
                    referencedTableName: 'surveys', // tabela referenciada
                    referencedColumnNames: ['id'], // coluna ad tabela acima referenciada
                    columnNames: ['survey_id'], //coluna dessa tabela que faz referencia
                    onDelete: 'CASCADE', // caso a tabela referenciada aqui, sofra modificação, aqui tambem sera
                    onUpdate: 'CASCADE'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('surveys_users')
    }


}
