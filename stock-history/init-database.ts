import knex from 'knex'
import config from './knexfile'

async function createDatabase() {
    if (!config || typeof config.connection === 'string') return
    const { database } = config.connection

    // Establish connection using default postgres database
    config.connection.database = 'postgres'
    const db = knex(config)

    try {
        await db.raw(`CREATE DATABASE ${database}`)
    } catch (err) {
        // Ignore database already exists error
        // @ts-ignore
        if (!err.code === '42P04') throw err
    }
    await db.destroy()
}

createDatabase()
