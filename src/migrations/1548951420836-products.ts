import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Products1548951420836 implements MigrationInterface {
    private readonly TABLE: string = 'products';

    public async up(queryRunner: QueryRunner): Promise<any> {
        queryRunner.createTable(new Table({
            name: this.TABLE,
            columns: [{
                type: 'integer',
                name: 'id',
                length: '10',
                isGenerated: true,
                isPrimary: true,
                generationStrategy: 'increment',
            }, {
                isNullable: false,
                type: 'varchar',
                name: 'name',
                length: '255',
            }, {
                isNullable: false,
                type: 'integer',
                name: 'price',
                length: '10',
            }, {
                isNullable: false,
                type: 'varchar',
                isUnique: true,
                name: 'imageName',
                length: '255',
            }, {
                isNullable: true,
                default: 'CURRENT_TIMESTAMP',
                type: 'timestamp',
                name: 'created_at',
            }, {
                isNullable: true,
                type: 'timestamp',
                name: 'deleted_at',
            },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.TABLE);

    }

}
