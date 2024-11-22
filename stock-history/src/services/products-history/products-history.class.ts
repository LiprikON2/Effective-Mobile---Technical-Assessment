// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application, ServiceTypes } from '../../declarations'
import type {
    ProductsHistory,
    ProductsHistoryData,
    ProductsHistoryPatch,
    ProductsHistoryQuery
} from './products-history.schema'
import { productsHistoryPath } from './products-history.shared'
import { initRabbitMQConsumer } from '../../hooks/init-rabbitmq-consumer'

export type { ProductsHistory, ProductsHistoryData, ProductsHistoryPatch, ProductsHistoryQuery }

export interface ProductsHistoryParams extends KnexAdapterParams<ProductsHistoryQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ProductsHistoryService<ServiceParams extends Params = ProductsHistoryParams> extends KnexService<
    ProductsHistory,
    ProductsHistoryData,
    ProductsHistoryParams,
    ProductsHistoryPatch
> {
    async setup(app: Application, path: keyof ServiceTypes) {
        initRabbitMQConsumer('products', path, app)
    }
    async teardown(app: Application, path: keyof ServiceTypes) {}
}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'products-history'
    }
}
