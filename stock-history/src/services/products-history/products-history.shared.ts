// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type {
    ProductsHistory,
    ProductsHistoryData,
    ProductsHistoryPatch,
    ProductsHistoryQuery,
    ProductsHistoryService
} from './products-history.class'

export type { ProductsHistory, ProductsHistoryData, ProductsHistoryPatch, ProductsHistoryQuery }

export type ProductsHistoryClientService = Pick<
    ProductsHistoryService<Params<ProductsHistoryQuery>>,
    (typeof productsHistoryMethods)[number]
>

export const productsHistoryPath = 'products-history'

export const productsHistoryMethods: Array<keyof ProductsHistoryService> = [
    'find',
    'get',
    'create',
    'patch',
    'remove'
]

export const productsHistoryClient = (client: ClientApplication) => {
    const connection = client.get('connection')

    client.use(productsHistoryPath, connection.service(productsHistoryPath), {
        methods: productsHistoryMethods
    })
}

// Add this service to the client service type index
declare module '../../client' {
    interface ServiceTypes {
        [productsHistoryPath]: ProductsHistoryClientService
    }
}
