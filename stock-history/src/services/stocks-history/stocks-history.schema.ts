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
        action: Type.String(),
        timestamp: Type.Number(),

        result_id: Type.Number(),
        product_id: Type.Number(),
        shop_id: Type.Number(),
        created_at: Type.Number(),
        shelf_quantity: Type.Number(),
        ordered_quantity: Type.Number(),
        total_quantity: Type.Number()
    },
    { $id: 'StocksHistory', additionalProperties: false }
)
export type StocksHistory = Static<typeof stocksHistorySchema>
export const stocksHistoryValidator = getValidator(stocksHistorySchema, dataValidator)
export const stocksHistoryResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

export const stocksHistoryExternalResolver = resolve<StocksHistory, HookContext<StocksHistoryService>>({})

// Schema for creating new entries
export const stocksHistoryDataSchema = Type.Pick(
    stocksHistorySchema,
    [
        'action',
        'result_id',
        'timestamp',
        'product_id',
        'shop_id',
        'created_at',
        'shelf_quantity',
        'ordered_quantity',
        'total_quantity'
    ],
    {
        $id: 'StocksHistoryData'
    }
)
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
export const stocksHistoryQueryProperties = Type.Pick(stocksHistorySchema, [
    'id',
    'action',
    'result_id',
    'timestamp',
    'product_id',
    'shop_id',
    'created_at',
    'shelf_quantity',
    'ordered_quantity',
    'total_quantity'
])
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
