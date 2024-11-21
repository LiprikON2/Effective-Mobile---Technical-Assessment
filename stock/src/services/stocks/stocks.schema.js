// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, virtual } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import { dataValidator, queryValidator } from '../../validators.js'
import { shopsSchema } from '../shops/shops.schema.js'
import { productsSchema } from '../products/products.schema.js'

// Main data model schema
export const stocksSchema = Type.Object(
    {
        id: Type.Number(),
        shelf_quantity: Type.Optional(Type.Number()),
        ordered_quantity: Type.Optional(Type.Number()),
        created_at: Type.Number(),

        product_id: Type.Number(),
        product: Type.Ref(productsSchema),

        shop_id: Type.Number(),
        shop: Type.Ref(shopsSchema)
    },
    { $id: 'Stocks', additionalProperties: false }
)
export const stocksValidator = getValidator(stocksSchema, dataValidator)
export const stocksResolver = resolve({
    shop: virtual(async (stock, context) => {
        // Associate the shop with the stock
        return context.app.service('shops').get(stock.shop_id)
    }),
    product: virtual(async (stock, context) => {
        // Associate the product with the stock
        return context.app.service('products').get(stock.product_id)
    })
})

export const stocksExternalResolver = resolve({})

// Schema for creating new entries
export const stocksDataSchema = Type.Pick(
    stocksSchema,
    ['product_id', 'shop_id', 'shelf_quantity', 'ordered_quantity'],
    {
        $id: 'StocksData'
    }
)
export const stocksDataValidator = getValidator(stocksDataSchema, dataValidator)
export const stocksDataResolver = resolve({
    created_at: async () => {
        return Date.now()
    }
})

// Schema for updating existing entries
export const stocksPatchSchema = Type.Partial(stocksSchema, {
    $id: 'StocksPatch'
})
export const stocksPatchValidator = getValidator(stocksPatchSchema, dataValidator)
export const stocksPatchResolver = resolve({})

// Schema for allowed query properties
export const stocksQueryProperties = Type.Pick(stocksSchema, ['id', 'created_at', 'product_id', 'shop_id'])
export const stocksQuerySchema = Type.Intersect(
    [
        querySyntax(stocksQueryProperties),
        // Add additional query properties here
        Type.Object({}, { additionalProperties: false })
    ],
    { additionalProperties: false }
)
export const stocksQueryValidator = getValidator(stocksQuerySchema, queryValidator)
export const stocksQueryResolver = resolve({})
