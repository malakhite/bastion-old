import {MigrationInterface, QueryRunner} from "typeorm";

export class New1649866584223 implements MigrationInterface {
    name = 'New1649866584223'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_648e3f5447f725579d7d4ffdfb" ON "roles" ("name") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" text NOT NULL, "name" text NOT NULL, "password" text NOT NULL, "is_active" boolean NOT NULL, "refresh_token" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "role_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_97672ac88f789774dd47f7c8be" ON "users" ("email") `);
        await queryRunner.query(`CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "key" character varying NOT NULL, "url" character varying NOT NULL, "alt_text" character varying, "height" integer, "width" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "author_id" uuid, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_categories" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text, CONSTRAINT "PK_9c45c4e9fb6ebf296990e1d3972" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "slug" text NOT NULL, "is_published" boolean NOT NULL, "published_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "current_revision_id" uuid, CONSTRAINT "REL_3631d55043d151a54ac95289a0" UNIQUE ("current_revision_id"), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_54ddf9075260407dcfdd724857" ON "posts" ("slug") `);
        await queryRunner.query(`CREATE TABLE "post_revisions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content_json" jsonb, "content" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "post_id" uuid, "authorId" uuid, "hero_id" uuid, CONSTRAINT "PK_871219c3d5044d70ff7d59480b8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_agency_types" ("id" SERIAL NOT NULL, "type" text NOT NULL, CONSTRAINT "UQ_47fd355ee0198fe942d83b1615b" UNIQUE ("type"), CONSTRAINT "PK_2dc7735e66602d0ced71b63b646" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulse_point_city" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "city" text NOT NULL, "region" text NOT NULL, "country" text NOT NULL, CONSTRAINT "PK_a15dfc0cef8225a27d4609e9e0a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_media" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "agency_id" uuid, CONSTRAINT "PK_8afd669c6bdb6a76c4da082f249" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_agencies" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "pulsepoint_id" integer NOT NULL, "name" text NOT NULL, "short_name" text NOT NULL, "initials" text NOT NULL, "description" text NOT NULL, "agency_id" text NOT NULL, "city" text NOT NULL, "state" text NOT NULL, "country" text NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "timezone" text NOT NULL, "psap" integer NOT NULL, "twitter_name" text, "facebook_name" text, "instagram_name" text, "linkedin_name" text, "youtube_url" text, "email" text, "website" text, "livestream" text, "cpr_only" boolean NOT NULL, "ogr_fid" integer NOT NULL, "boundary" polygon NOT NULL, "centroid" point NOT NULL, "image" text NOT NULL, "splashscreen" text NOT NULL, "has_unit_legend" boolean NOT NULL, "agency_type_id" integer, CONSTRAINT "UQ_e216d6e782de4f295221ef10b2b" UNIQUE ("pulsepoint_id"), CONSTRAINT "UQ_6afef241dead067e04882a2b404" UNIQUE ("agency_id"), CONSTRAINT "PK_fa6b096cc8e4cc8007a2c7ec86e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_incident_types" ("id" SERIAL NOT NULL, "code" text NOT NULL, "description" text NOT NULL, CONSTRAINT "UQ_85cd06c6971b6a9abda1572a8bd" UNIQUE ("code"), CONSTRAINT "PK_e382ac94f02b8712bb31f2e476d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_incidents" ("id" bigint NOT NULL, "latitude" numeric NOT NULL, "longitude" numeric NOT NULL, "public" boolean NOT NULL, "call_received" TIMESTAMP WITH TIME ZONE NOT NULL, "call_closed" TIMESTAMP WITH TIME ZONE NOT NULL, "address_full" text NOT NULL, "address_medical" text NOT NULL, "address_truncated" boolean NOT NULL, "street_number" text, "common_place_name" text, "agency_id" uuid, "incident_type" integer, CONSTRAINT "PK_d9a3447c5a8f3ac4716ddbacd6c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pulsepoint_units" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "designator" text NOT NULL, "agency_id" uuid, CONSTRAINT "PK_ad53664d565ed2918c872dbd23d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factbook_categories" ("id" SERIAL NOT NULL, "title" text NOT NULL, "comparative" numeric, CONSTRAINT "PK_7912cf27ea850e0349909452fac" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factbook_field_types" ("id" SERIAL NOT NULL, "cia_id" numeric, "title" text NOT NULL, "slug" text NOT NULL, "definition" text, CONSTRAINT "PK_6cfffded503eabd4418a0f785f9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1325b8fa27fbebe55424adc4fa" ON "factbook_field_types" ("cia_id") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_08363338f23f64998e491f388a" ON "factbook_field_types" ("slug") `);
        await queryRunner.query(`CREATE TABLE "factbook_fields" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "comparative" numeric, "field_type_id" integer, "country_id" uuid, "category_id" integer, CONSTRAINT "PK_fcac9cf6a6a1e9b674a3fc10ac7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factbook_regions" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8399cfc8c41c2815bea73ed2264" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "factbook_countries" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "name" text NOT NULL, "slug" text NOT NULL, "gec" text NOT NULL, "iso_3166_alpha_2" text, "iso_3166_alpha_3" text, "iso_3166_numeric" numeric, "stanag_1059" text, "internet_code" text, "code_comment" text, "published_at" TIMESTAMP WITH TIME ZONE NOT NULL, "flag_description" text, "region_id" integer, CONSTRAINT "PK_ad321d01bad9dc539429d27aa46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_5e50a0b8d5343b2a3f1a8ff217" ON "factbook_countries" ("slug") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8e4512a81919d9c4519366e074" ON "factbook_countries" ("gec") `);
        await queryRunner.query(`CREATE TABLE "post_revisions_categories_post_categories" ("postRevisionsId" uuid NOT NULL, "postCategoriesId" integer NOT NULL, CONSTRAINT "PK_ba934a0295068686d7fbad1f787" PRIMARY KEY ("postRevisionsId", "postCategoriesId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_71a5b801268398fd2f313faefe" ON "post_revisions_categories_post_categories" ("postRevisionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_98f2efd24da81d0aa3d3041d61" ON "post_revisions_categories_post_categories" ("postCategoriesId") `);
        await queryRunner.query(`CREATE TABLE "pulsepoint_agencies_cities_served_pulse_point_city" ("pulsepointAgenciesId" uuid NOT NULL, "pulsePointCityId" uuid NOT NULL, CONSTRAINT "PK_07dfa54ce4df1c0fe36713229a4" PRIMARY KEY ("pulsepointAgenciesId", "pulsePointCityId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f1fec704eed6ed58a26f405961" ON "pulsepoint_agencies_cities_served_pulse_point_city" ("pulsepointAgenciesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_87d0b7d23c2325ca0c46588b1a" ON "pulsepoint_agencies_cities_served_pulse_point_city" ("pulsePointCityId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assets" ADD CONSTRAINT "FK_2ad937d098559f87b9f68ff62a4" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_3631d55043d151a54ac95289a0a" FOREIGN KEY ("current_revision_id") REFERENCES "post_revisions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_revisions" ADD CONSTRAINT "FK_21715fae1f647ae1e4b0741346a" FOREIGN KEY ("post_id") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_revisions" ADD CONSTRAINT "FK_e116cad825034bf4feca997cdb2" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_revisions" ADD CONSTRAINT "FK_c4515479751b4678641908ceefd" FOREIGN KEY ("hero_id") REFERENCES "assets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_media" ADD CONSTRAINT "FK_1221ae0e18e1f00d9a26016a224" FOREIGN KEY ("agency_id") REFERENCES "pulsepoint_agencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies" ADD CONSTRAINT "FK_0ed822a69026edda17daa8e2b13" FOREIGN KEY ("agency_type_id") REFERENCES "pulsepoint_agency_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_incidents" ADD CONSTRAINT "FK_04f7ca17815411249b54fefeeb0" FOREIGN KEY ("agency_id") REFERENCES "pulsepoint_agencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_incidents" ADD CONSTRAINT "FK_5f2fc528c2489f075fa0c689ca7" FOREIGN KEY ("incident_type") REFERENCES "pulsepoint_incident_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_units" ADD CONSTRAINT "FK_2ec5f5621339fc35318183503b9" FOREIGN KEY ("agency_id") REFERENCES "pulsepoint_agencies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" ADD CONSTRAINT "FK_190c873e8540141c390ac41e419" FOREIGN KEY ("field_type_id") REFERENCES "factbook_field_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" ADD CONSTRAINT "FK_804a6935a0e14bac94311984e52" FOREIGN KEY ("country_id") REFERENCES "factbook_countries"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" ADD CONSTRAINT "FK_b919226fa489aad821917643ab6" FOREIGN KEY ("category_id") REFERENCES "factbook_categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "factbook_countries" ADD CONSTRAINT "FK_39902604c861c456cce1824cbf9" FOREIGN KEY ("region_id") REFERENCES "factbook_regions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_revisions_categories_post_categories" ADD CONSTRAINT "FK_71a5b801268398fd2f313faefe0" FOREIGN KEY ("postRevisionsId") REFERENCES "post_revisions"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_revisions_categories_post_categories" ADD CONSTRAINT "FK_98f2efd24da81d0aa3d3041d610" FOREIGN KEY ("postCategoriesId") REFERENCES "post_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies_cities_served_pulse_point_city" ADD CONSTRAINT "FK_f1fec704eed6ed58a26f4059619" FOREIGN KEY ("pulsepointAgenciesId") REFERENCES "pulsepoint_agencies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies_cities_served_pulse_point_city" ADD CONSTRAINT "FK_87d0b7d23c2325ca0c46588b1aa" FOREIGN KEY ("pulsePointCityId") REFERENCES "pulse_point_city"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies_cities_served_pulse_point_city" DROP CONSTRAINT "FK_87d0b7d23c2325ca0c46588b1aa"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies_cities_served_pulse_point_city" DROP CONSTRAINT "FK_f1fec704eed6ed58a26f4059619"`);
        await queryRunner.query(`ALTER TABLE "post_revisions_categories_post_categories" DROP CONSTRAINT "FK_98f2efd24da81d0aa3d3041d610"`);
        await queryRunner.query(`ALTER TABLE "post_revisions_categories_post_categories" DROP CONSTRAINT "FK_71a5b801268398fd2f313faefe0"`);
        await queryRunner.query(`ALTER TABLE "factbook_countries" DROP CONSTRAINT "FK_39902604c861c456cce1824cbf9"`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" DROP CONSTRAINT "FK_b919226fa489aad821917643ab6"`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" DROP CONSTRAINT "FK_804a6935a0e14bac94311984e52"`);
        await queryRunner.query(`ALTER TABLE "factbook_fields" DROP CONSTRAINT "FK_190c873e8540141c390ac41e419"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_units" DROP CONSTRAINT "FK_2ec5f5621339fc35318183503b9"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_incidents" DROP CONSTRAINT "FK_5f2fc528c2489f075fa0c689ca7"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_incidents" DROP CONSTRAINT "FK_04f7ca17815411249b54fefeeb0"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_agencies" DROP CONSTRAINT "FK_0ed822a69026edda17daa8e2b13"`);
        await queryRunner.query(`ALTER TABLE "pulsepoint_media" DROP CONSTRAINT "FK_1221ae0e18e1f00d9a26016a224"`);
        await queryRunner.query(`ALTER TABLE "post_revisions" DROP CONSTRAINT "FK_c4515479751b4678641908ceefd"`);
        await queryRunner.query(`ALTER TABLE "post_revisions" DROP CONSTRAINT "FK_e116cad825034bf4feca997cdb2"`);
        await queryRunner.query(`ALTER TABLE "post_revisions" DROP CONSTRAINT "FK_21715fae1f647ae1e4b0741346a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_3631d55043d151a54ac95289a0a"`);
        await queryRunner.query(`ALTER TABLE "assets" DROP CONSTRAINT "FK_2ad937d098559f87b9f68ff62a4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_a2cecd1a3531c0b041e29ba46e1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_87d0b7d23c2325ca0c46588b1a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f1fec704eed6ed58a26f405961"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_agencies_cities_served_pulse_point_city"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_98f2efd24da81d0aa3d3041d61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_71a5b801268398fd2f313faefe"`);
        await queryRunner.query(`DROP TABLE "post_revisions_categories_post_categories"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8e4512a81919d9c4519366e074"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e50a0b8d5343b2a3f1a8ff217"`);
        await queryRunner.query(`DROP TABLE "factbook_countries"`);
        await queryRunner.query(`DROP TABLE "factbook_regions"`);
        await queryRunner.query(`DROP TABLE "factbook_fields"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08363338f23f64998e491f388a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1325b8fa27fbebe55424adc4fa"`);
        await queryRunner.query(`DROP TABLE "factbook_field_types"`);
        await queryRunner.query(`DROP TABLE "factbook_categories"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_units"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_incidents"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_incident_types"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_agencies"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_media"`);
        await queryRunner.query(`DROP TABLE "pulse_point_city"`);
        await queryRunner.query(`DROP TABLE "pulsepoint_agency_types"`);
        await queryRunner.query(`DROP TABLE "post_revisions"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_54ddf9075260407dcfdd724857"`);
        await queryRunner.query(`DROP TABLE "posts"`);
        await queryRunner.query(`DROP TABLE "post_categories"`);
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97672ac88f789774dd47f7c8be"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_648e3f5447f725579d7d4ffdfb"`);
        await queryRunner.query(`DROP TABLE "roles"`);
    }

}
