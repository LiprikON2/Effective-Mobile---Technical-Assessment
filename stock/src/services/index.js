import { stock } from './stock/stock.js'
import { TestService } from './TestService.js'

export const services = (app) => {
    app.configure(stock)

    // All services will be registered here
    app.use('test', new TestService())
}
