// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application, ServiceTypes } from '../../declarations'
import type {
    StocksHistory,
    StocksHistoryData,
    StocksHistoryPatch,
    StocksHistoryQuery
} from './stocks-history.schema'
import { initRabbitMQConsumer } from '../../hooks/init-rabbitmq-consumer'

export type { StocksHistory, StocksHistoryData, StocksHistoryPatch, StocksHistoryQuery }

export interface StocksHistoryParams extends KnexAdapterParams<StocksHistoryQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class StocksHistoryService<ServiceParams extends Params = StocksHistoryParams> extends KnexService<
    StocksHistory,
    StocksHistoryData,
    StocksHistoryParams,
    StocksHistoryPatch
> {
    async setup(app: Application, path: keyof ServiceTypes) {
        initRabbitMQConsumer('stocks', path, app)
    }
    async teardown(app: Application, path: keyof ServiceTypes) {}
}

export const getOptions = (app: Application): KnexAdapterOptions => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'stocks-history'
    }
}
