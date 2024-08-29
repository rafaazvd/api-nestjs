import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724902550424 implements MigrationInterface {
    name = 'Initial1724902550424'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tutorial" ("id" SERIAL NOT NULL, "title" character varying(255) NOT NULL, "description" text, "content" text NOT NULL, "author" character varying(255) NOT NULL, "status" character varying(20) NOT NULL DEFAULT 'draft', "tags" text, "views" integer DEFAULT '0', "createdAt" TIMESTAMP(0) NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_519bc90699303e81a3a9333d02f" UNIQUE ("title"), CONSTRAINT "PK_4d07a72cfa203b3b21bde6da1b3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "password" character varying(355) NOT NULL, "cpf" character(14) NOT NULL, "name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "createAt" TIMESTAMP(0) NOT NULL DEFAULT now(), CONSTRAINT "UQ_a6235b5ef0939d8deaad755fc87" UNIQUE ("cpf"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tutorial"`);
    }

}
