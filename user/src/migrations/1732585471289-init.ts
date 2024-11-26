import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1732585471289 implements MigrationInterface {
    name = 'Init1732585471289'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "has_issues" boolean NOT NULL, "gender" "public"."users_gender_enum" NOT NULL, "birth_date" date NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_gender_enum"`);
    }

}
