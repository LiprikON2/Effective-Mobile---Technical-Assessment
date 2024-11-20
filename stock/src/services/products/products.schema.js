// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'

// Main data model schema
export const productsSchema = Type.Object(
    {
        id: Type.Number(),
        name: Type.String(),
        plu: Type.String()
    },
    { $id: 'Products', additionalProperties: false }
)
export const productsValidator = getValidator(productsSchema, dataValidator)
export const productsResolver = resolve({})

export const productsExternalResolver = resolve({})

// Schema for creating new entries
export const productsDataSchema = Type.Pick(productsSchema, ['name', 'plu'], {
    $id: 'ProductsData'
})
export const productsDataValidator = getValidator(productsDataSchema, dataValidator)
export const productsDataResolver = resolve({})

// Schema for updating existing entries
export const productsPatchSchema = Type.Partial(productsSchema, {
    $id: 'ProductsPatch'
})
export const productsPatchValidator = getValidator(productsPatchSchema, dataValidator)
export const productsPatchResolver = resolve({})

// Schema for allowed query properties
export const productsQueryProperties = Type.Pick(productsSchema, ['id', 'name'])
export const productsQuerySchema = Type.Intersect(
    [
        querySyntax(productsQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export const productsQueryValidator = getValidator(productsQuerySchema, queryValidator)
export const productsQueryResolver = resolve({})
