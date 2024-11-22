// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('products-history', (table) => {
        table.increments('id')

        table.string('action').notNullable()
        table.integer('result_id').notNullable()
        table.string('name').notNullable()
        table.string('plu').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('products-history')
}
