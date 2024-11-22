// For more information about this file see https://dove.feathersjs.com/guides/cli/client.html
import { feathers } from '@feathersjs/feathers'
import type { TransportConnection, Application } from '@feathersjs/feathers'
import authenticationClient from '@feathersjs/authentication-client'
import type { AuthenticationClientOptions } from '@feathersjs/authentication-client'

import { productsHistoryClient } from './services/products-history/products-history.shared'
export type {
    ProductsHistory,
    ProductsHistoryData,
    ProductsHistoryQuery,
    ProductsHistoryPatch
} from './services/products-history/products-history.shared'

import { stocksHistoryClient } from './services/stocks-history/stocks-history.shared'
export type {
    StocksHistory,
    StocksHistoryData,
    StocksHistoryQuery,
    StocksHistoryPatch
} from './services/stocks-history/stocks-history.shared'

export interface Configuration {
    connection: TransportConnection<ServiceTypes>
}

export interface ServiceTypes {}

export type ClientApplication = Application<ServiceTypes, Configuration>

/**
 * Returns a typed client for the stock-history app.
 *
 * @param connection The REST or Socket.io Feathers client connection
 * @param authenticationOptions Additional settings for the authentication client
 * @see https://dove.feathersjs.com/api/client.html
 * @returns The Feathers client application
 */
export const createClient = <Configuration = any,>(
    connection: TransportConnection<ServiceTypes>,
    authenticationOptions: Partial<AuthenticationClientOptions> = {}
) => {
    const client: ClientApplication = feathers()

    client.configure(connection)
    client.configure(authenticationClient(authenticationOptions))
    client.set('connection', connection)

    client.configure(stocksHistoryClient)
    client.configure(productsHistoryClient)
    return client
}
