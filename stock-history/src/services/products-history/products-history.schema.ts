// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { ProductsHistoryService } from './products-history.class'

// Main data model schema
export const productsHistorySchema = Type.Object(
    {
        id: Type.Number(),
        action: Type.String(),
        timestamp: Type.Number(),
        result_id: Type.Number(),
        name: Type.String(),
        plu: Type.String()
    },
    { $id: 'ProductsHistory', additionalProperties: false }
)
export type ProductsHistory = Static<typeof productsHistorySchema>
export const productsHistoryValidator = getValidator(productsHistorySchema, dataValidator)
export const productsHistoryResolver = resolve<ProductsHistory, HookContext<ProductsHistoryService>>({})

export const productsHistoryExternalResolver = resolve<ProductsHistory, HookContext<ProductsHistoryService>>(
    {}
)

// Schema for creating new entries
export const productsHistoryDataSchema = Type.Pick(
    productsHistorySchema,
    ['action', 'result_id', 'timestamp', 'name', 'plu'],
    {
        $id: 'ProductsHistoryData'
    }
)
export type ProductsHistoryData = Static<typeof productsHistoryDataSchema>
export const productsHistoryDataValidator = getValidator(productsHistoryDataSchema, dataValidator)
export const productsHistoryDataResolver = resolve<ProductsHistory, HookContext<ProductsHistoryService>>({})

// Schema for updating existing entries
export const productsHistoryPatchSchema = Type.Partial(productsHistorySchema, {
    $id: 'ProductsHistoryPatch'
})
export type ProductsHistoryPatch = Static<typeof productsHistoryPatchSchema>
export const productsHistoryPatchValidator = getValidator(productsHistoryPatchSchema, dataValidator)
export const productsHistoryPatchResolver = resolve<ProductsHistory, HookContext<ProductsHistoryService>>({})

// Schema for allowed query properties
export const productsHistoryQueryProperties = Type.Pick(productsHistorySchema, [
    'id',
    'action',
    'result_id',
    'timestamp',
    'name',
    'plu'
])
export const productsHistoryQuerySchema = Type.Intersect(
    [
        querySyntax(productsHistoryQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export type ProductsHistoryQuery = Static<typeof productsHistoryQuerySchema>
export const productsHistoryQueryValidator = getValidator(productsHistoryQuerySchema, queryValidator)
export const productsHistoryQueryResolver = resolve<
    ProductsHistoryQuery,
    HookContext<ProductsHistoryService>
>({})
