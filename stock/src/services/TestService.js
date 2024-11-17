import { feathers } from '@feathersjs/feathers'

/**
 * @typedef {import('@feathersjs/feathers').Application} Application
 * @typedef {import('@feathersjs/feathers').Id} Id
 * @typedef {import('@feathersjs/feathers').NullableId} NullableId
 * @typedef {import('@feathersjs/feathers').Params} Params
 */

export class TestService {
    /**
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async find(params) {
        return { hello: 'world!!' }
    }

    /**
     * @param {Id} id
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async get(id, params) {}

    /**
     * @param {any} data
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async create(data, params) {}

    /**
     * @param {NullableId} id
     * @param {any} data
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async update(id, data, params) {}

    /**
     * @param {NullableId} id
     * @param {any} data
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async patch(id, data, params) {}

    /**
     * @param {NullableId} id
     * @param {Params} params
     * @returns {Promise<any>}
     */
    async remove(id, params) {}

    /**
     * @param {string} path
     * @param {Application} app
     * @returns {Promise<void>}
     */
    async setup(path, app) {}

    /**
     * @param {string} path
     * @param {Application} app
     * @returns {Promise<void>}
     */
    async teardown(path, app) {}
}

const app = feathers()
// const app = feathers({ test: new TestService() })

app.use('test', new TestService())
