// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { StocksHistoryService } from './stocks-history.class'

// Main data model schema
export const stocksHistorySchema = Type.Object(
    {
        id: Type.Number(),
        text: Type.String()
    },
    { $id: 'StocksHistory', additionalProperties: false }
)
export type StocksHistory = Static<typeof stocksHistorySchema>
export const stocksHistoryValidator = getValidator(stocksHistorySchema, dataValidator)
export const stocksHistoryResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

export const stocksHistoryExternalResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

// Schema for creating new entries
export const stocksHistoryDataSchema = Type.Pick(stocksHistorySchema, ['text'], {
    $id: 'StocksHistoryData'
})
export type StocksHistoryData = Static<typeof stocksHistoryDataSchema>
export const stocksHistoryDataValidator = getValidator(stocksHistoryDataSchema, dataValidator)
export const stocksHistoryDataResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

// Schema for updating existing entries
export const stocksHistoryPatchSchema = Type.Partial(stocksHistorySchema, {
    $id: 'StocksHistoryPatch'
})
export type StocksHistoryPatch = Static<typeof stocksHistoryPatchSchema>
export const stocksHistoryPatchValidator = getValidator(stocksHistoryPatchSchema, dataValidator)
export const stocksHistoryPatchResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

// Schema for allowed query properties
export const stocksHistoryQueryProperties = Type.Pick(stocksHistorySchema, ['id', 'text'])
export const stocksHistoryQuerySchema = Type.Intersect(
    [
        querySyntax(stocksHistoryQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type StocksHistoryQuery = Static<typeof stocksHistoryQuerySchema>
export const stocksHistoryQueryValidator = getValidator(stocksHistoryQuerySchema, queryValidator)
export const stocksHistoryQueryResolver = resolve<StocksHistoryQuery, HookContext<StocksHistoryService>>({})
