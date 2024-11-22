import { productsHistory } from './products-history/products-history'
import { stocksHistory } from './stocks-history/stocks-history'
// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
    app.configure(productsHistory)
    app.configure(stocksHistory)
    // All services will be registered here
}
