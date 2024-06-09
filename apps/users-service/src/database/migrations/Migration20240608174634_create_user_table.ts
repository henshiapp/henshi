import { Migration } from '@mikro-orm/migrations';

export class Migration20240608174634_create_user_table extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "role" smallint not null default 0, "email_confirmed" boolean not null default false, "refresh_token" varchar(255) null, constraint "user_pkey" primary key ("id"));');
    this.addSql('create index "user_email_index" on "user" ("email");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "user" cascade;');
  }

}
