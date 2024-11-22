// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'
import {
    stocksDataValidator,
    stocksPatchValidator,
    stocksQueryValidator,
    stocksResolver,
    stocksExternalResolver,
    stocksDataResolver,
    stocksPatchResolver,
    stocksQueryResolver
} from './stocks.schema.js'
import { StocksService, getOptions } from './stocks.class.js'
import { stocksPath, stocksMethods } from './stocks.shared.js'
import { authenticate } from '@feathersjs/authentication'

export * from './stocks.class.js'
export * from './stocks.schema.js'

// A configure function that registers the service and its hooks via `app.configure`
export const stocks = (app) => {
    // Register our service on the Feathers application
    app.use(stocksPath, new StocksService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: stocksMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })

    // Initialize hooks
    app.service(stocksPath).hooks({
        around: {
            all: [
                // Default feathers auth
                //     authenticate('jwt'),
                schemaHooks.resolveExternal(stocksExternalResolver),
                schemaHooks.resolveResult(stocksResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(stocksQueryValidator),
                schemaHooks.resolveQuery(stocksQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(stocksDataValidator),
                schemaHooks.resolveData(stocksDataResolver)
            ],
            patch: [
                schemaHooks.validateData(stocksPatchValidator),
                schemaHooks.resolveData(stocksPatchResolver)
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
