/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = async (knex) => {
    await knex.schema.alterTable('stocks', (table) => {
        table.dropColumn('text')
        table.integer('product_id').notNullable().references('id').inTable('products').onDelete('CASCADE')
        table.integer('shop_id').notNullable().references('id').inTable('shops').onDelete('CASCADE')

        table.integer('shelf_quantity').notNullable().defaultTo(0)
        table.integer('ordered_quantity').notNullable().defaultTo(0)

        table.check('shelf_quantity >= 0', undefined, 'check_shelf_quantity_positive')
        table.check('ordered_quantity >= 0', undefined, 'check_ordered_quantity_positive')
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

        table.dropChecks()
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
