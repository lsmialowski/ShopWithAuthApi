import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class InvalidTokens1548952288890 implements MigrationInterface {
    private readonly TABLE: string = 'invalid_tokens';

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.createTable(new Table({
            name: this.TABLE,
            columns: [{
                type: 'integer',
                name: 'id',
                length: '10',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: 'increment',
            }, {
                isNullable: false,
                type: 'varchar',
                name: 'token',
                length: '255',
            }, {
                isNullable: false,
                type: 'timestamp',
                name: 'expires',
            },
            ],

        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.TABLE);

    }

}
