const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class personIdUser1636118252406 {
    name = 'personIdUser1636118252406'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "person" ADD "idUser" character varying(50) NOT NULL DEFAULT 'default'`);
        await queryRunner.query(`CREATE INDEX "IDX_a9f512264baa71edd60729a369" ON "person" ("idUser") `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP INDEX "IDX_a9f512264baa71edd60729a369"`);
        await queryRunner.query(`ALTER TABLE "person" DROP COLUMN "idUser"`);
    }
}
