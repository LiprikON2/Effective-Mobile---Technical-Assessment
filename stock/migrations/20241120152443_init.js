/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.alterTable('stocks', (table) => {
        table.dropColumn('text')
        table
            .integer('product_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('products')
            .onDelete('CASCADE')
        table
            .integer('shop_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('shops')
            .onDelete('CASCADE')

        table.integer('shelf_quantity').unsigned().notNullable().defaultTo(0)
        table.integer('ordered_quantity').unsigned().notNullable().defaultTo(0)
    })

    await knex.schema.alterTable('products', (table) => {
        table.dropColumn('text')
        table.string('name').notNullable()
        table.string('plu').notNullable()
    })

    await knex.schema.alterTable('shops', (table) => {
        table.dropColumn('text')
        table.string('name').notNullable()
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = async (knex) => {
    await knex.schema.alterTable('stocks', (table) => {
        table.string('text')
        table.dropColumn('product_id')
        table.dropColumn('shop_id')
        table.dropColumn('shelf_quantity')
        table.dropColumn('ordered_quantity')
    })

    await knex.schema.alterTable('products', (table) => {
        table.dropColumn('name')
        table.string('text')
        table.dropColumn('plu')
    })

    await knex.schema.alterTable('shops', (table) => {
        table.dropColumn('name')
        table.string('text')
    })
}
