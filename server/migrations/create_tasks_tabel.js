// @ts-check

export const up = (knex) => (
  knex.schema.createTable('tasks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('description').nullable();
    table.integer('status_id').unsigned().notNullable().references('id').inTable('statuses');
    table.integer('creator_id').unsigned().notNullable().references('id').inTable('users');
    table.integer('executor_id').unsigned().nullable().references('id').inTable('users');
    table.timestamp('created_at').nullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

export const down = (knex) => knex.schema.dropTable('tasks');