const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class initial1635863277570 {
    name = 'initial1635863277570'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "person_gender_enum" AS ENUM('Male', 'Female', 'Other')`);
        await queryRunner.query(`CREATE TABLE "person" ("id" SERIAL NOT NULL, "creationDate" TIMESTAMP NOT NULL DEFAULT now(), "lastUpdatedDate" TIMESTAMP DEFAULT now(), "firstName" character varying(200) NOT NULL, "lastName" character varying(200) NOT NULL, "birthDate" TIMESTAMP, "gender" "person_gender_enum", "email" character varying, "phone" character varying, "photo" character varying, "deletedDate" TIMESTAMP, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TYPE "person_gender_enum"`);
    }
}
