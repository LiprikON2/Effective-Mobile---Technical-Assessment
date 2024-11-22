// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    stocksHistoryDataValidator,
    stocksHistoryPatchValidator,
    stocksHistoryQueryValidator,
    stocksHistoryResolver,
    stocksHistoryExternalResolver,
    stocksHistoryDataResolver,
    stocksHistoryPatchResolver,
    stocksHistoryQueryResolver
} from './stocks-history.schema'

import type { Application } from '../../declarations'
import { StocksHistoryService, getOptions } from './stocks-history.class'
import { stocksHistoryPath, stocksHistoryMethods } from './stocks-history.shared'

export * from './stocks-history.class'
export * from './stocks-history.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const stocksHistory = (app: Application) => {
    // Register our service on the Feathers application
    app.use(stocksHistoryPath, new StocksHistoryService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: stocksHistoryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(stocksHistoryPath).hooks({
        around: {
            all: [
                schemaHooks.resolveExternal(stocksHistoryExternalResolver),
                schemaHooks.resolveResult(stocksHistoryResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(stocksHistoryQueryValidator),
                schemaHooks.resolveQuery(stocksHistoryQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(stocksHistoryDataValidator),
                schemaHooks.resolveData(stocksHistoryDataResolver)
            ],
            patch: [
                schemaHooks.validateData(stocksHistoryPatchValidator),
                schemaHooks.resolveData(stocksHistoryPatchResolver)
            ],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    })
}

// Add this service to the service type index
declare module '../../declarations' {
    interface ServiceTypes {
        [stocksHistoryPath]: StocksHistoryService
    }
}
