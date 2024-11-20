import { shops } from './shops/shops.js'
import { products } from './products/products.js'
import { stocks } from './stocks/stocks.js'
export const services = (app) => {
    app.configure(shops)

    app.configure(products)

    app.configure(stocks)

    // All services will be registered here
}
