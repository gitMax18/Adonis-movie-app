import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "movies";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("title", 255).notNullable();
      table.text("description").nullable();
      table.string("short_description", 255).notNullable();
      table.string("director", 255).nullable();
      table.integer("year").nullable();
      table.string("image", 255).nullable();
      table.integer("user").notNullable();
      table.string("slug", 255).notNullable();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
