// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('stocks-history', (table) => {
        table.increments('id')
        table.string('action').notNullable()
        table.bigint('timestamp').notNullable()

        table.integer('result_id').notNullable()
        table.integer('product_id').notNullable()
        table.integer('shop_id').notNullable()
        table.bigint('created_at').notNullable()
        table.integer('shelf_quantity').notNullable()
        table.integer('ordered_quantity').notNullable()
        table.integer('total_quantity').notNullable()
    })
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('stocks-history')
}
