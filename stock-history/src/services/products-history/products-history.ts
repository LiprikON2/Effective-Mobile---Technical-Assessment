// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
    productsHistoryDataValidator,
    productsHistoryPatchValidator,
    productsHistoryQueryValidator,
    productsHistoryResolver,
    productsHistoryExternalResolver,
    productsHistoryDataResolver,
    productsHistoryPatchResolver,
    productsHistoryQueryResolver
} from './products-history.schema'

import type { Application } from '../../declarations'
import { ProductsHistoryService, getOptions } from './products-history.class'
import { productsHistoryPath, productsHistoryMethods } from './products-history.shared'

export * from './products-history.class'
export * from './products-history.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const productsHistory = (app: Application) => {
    // Register our service on the Feathers application
    app.use(productsHistoryPath, new ProductsHistoryService(getOptions(app)), {
        // A list of all methods this service exposes externally
        methods: productsHistoryMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    })
    // Initialize hooks
    app.service(productsHistoryPath).hooks({
        around: {
            all: [
                schemaHooks.resolveExternal(productsHistoryExternalResolver),
                schemaHooks.resolveResult(productsHistoryResolver)
            ]
        },
        before: {
            all: [
                schemaHooks.validateQuery(productsHistoryQueryValidator),
                schemaHooks.resolveQuery(productsHistoryQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schemaHooks.validateData(productsHistoryDataValidator),
                schemaHooks.resolveData(productsHistoryDataResolver)
            ],
            patch: [
                schemaHooks.validateData(productsHistoryPatchValidator),
                schemaHooks.resolveData(productsHistoryPatchResolver)
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
        [productsHistoryPath]: ProductsHistoryService
    }
}
