// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
    StocksHistory,
    StocksHistoryData,
    StocksHistoryPatch,
    StocksHistoryQuery,
    StocksHistoryService
} from './stocks-history.class'

export type { StocksHistory, StocksHistoryData, StocksHistoryPatch, StocksHistoryQuery }

export type StocksHistoryClientService = Pick<
    StocksHistoryService<Params<StocksHistoryQuery>>,
    (typeof stocksHistoryMethods)[number]
>

export const stocksHistoryPath = 'stocks-history'

export const stocksHistoryMethods: Array<keyof StocksHistoryService> = [
    'find',
    'get',
    'create',
    'patch',
    'remove'
]

export const stocksHistoryClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(stocksHistoryPath, connection.service(stocksHistoryPath), {
        methods: stocksHistoryMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [stocksHistoryPath]: StocksHistoryClientService
    }
}
