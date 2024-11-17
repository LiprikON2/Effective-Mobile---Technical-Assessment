import { TestService } from './TestService.js'

export const services = (app) => {
    // All services will be registered here
    app.use('test', new TestService())
}
