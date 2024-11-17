// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const stockSchema = Type.Object(
    {
        id: Type.Number(),
        text: Type.String()
    },
    { $id: 'Stock', additionalProperties: false }
)
export const stockValidator = getValidator(stockSchema, dataValidator)
export const stockResolver = resolve({})

export const stockExternalResolver = resolve({})

// Schema for creating new entries
export const stockDataSchema = Type.Pick(stockSchema, ['text'], {
    $id: 'StockData'
})
export const stockDataValidator = getValidator(stockDataSchema, dataValidator)
export const stockDataResolver = resolve({})

// Schema for updating existing entries
export const stockPatchSchema = Type.Partial(stockSchema, {
    $id: 'StockPatch'
})
export const stockPatchValidator = getValidator(stockPatchSchema, dataValidator)
export const stockPatchResolver = resolve({})

// Schema for allowed query properties
export const stockQueryProperties = Type.Pick(stockSchema, ['id', 'text'])
export const stockQuerySchema = Type.Intersect(
    [
        querySyntax(stockQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export const stockQueryValidator = getValidator(stockQuerySchema, queryValidator)
export const stockQueryResolver = resolve({})
