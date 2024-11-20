import { stocks } from './stocks/stocks.js'
export const services = (app) => {
    app.configure(stocks)

    // All services will be registered here
}
