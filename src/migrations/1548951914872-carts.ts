import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class Carts1548951914872 implements MigrationInterface {
    private readonly TABLE: string = 'carts';

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
                type: 'integer',
                name: 'userId',
                length: '10',
            }, {
                isNullable: false,
                type: 'integer',
                name: 'productsId',
                length: '10',
            }, {
                isNullable: false,
                type: 'integer',
                name: 'quantity',
                length: '10',
            }, {
                isNullable: false,
                type: 'integer',
                name: 'price',
                length: '10',
            }, {
                isNullable: true,
                type: 'timestamp',
                name: 'deleted_at',
            },
            ],
            foreignKeys: [{
                columnNames: ['userId'],
                name: 'cart_user_fk',
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
            }, {
                columnNames: ['productsId'],
                name: 'cart_product_fk',
                referencedColumnNames: ['id'],
                referencedTableName: 'products',
            },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(this.TABLE);

    }

}
