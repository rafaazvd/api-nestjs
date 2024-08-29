import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRelationship1724904512420 implements MigrationInterface {
    name = 'AddUserRelationship1724904512420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "tutorial" ADD CONSTRAINT "FK_9b4592ddb8a5aa71787e2cb039c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tutorial" DROP CONSTRAINT "FK_9b4592ddb8a5aa71787e2cb039c"`);
        await queryRunner.query(`ALTER TABLE "tutorial" DROP COLUMN "userId"`);
    }

}
