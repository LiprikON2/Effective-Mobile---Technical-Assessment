import { KnexService } from '@feathersjs/knex'

/**
 * @typedef {import("@feathersjs/knex").KnexAdapterParams} KnexAdapterParams
 */

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class StocksService extends KnexService {
    /**
     * ref: https://feathersjs.com/api/databases/knex.html#associations
     *
     * @param {KnexAdapterParams} params - The parameters for the Knex adapter.
     * @returns {Object} The constructed query.
     */
    createQuery(params) {
        const query = super.createQuery(params)
        // query.join('products as product', 'stocks.product_id', 'product_id')
        // // TODO: GET requests report incorrect total when using distinct
        // // ref: https://github.com/feathersjs/feathers/pull/3525
        // // query.distinct()
        return query
    }
}

export const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'stocks'
    }
}
