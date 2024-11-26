import { registerAs } from '@nestjs/config'
import { DataSource, DataSourceOptions } from 'typeorm'

// ref: https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75
const isDev = process.env.MODE === 'DEV'

const options = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    // ref: https://medium.com/@gausmann.simon/nestjs-typeorm-and-postgresql-full-example-development-and-project-setup-working-with-database-c1a2b1b11b8f#:~:text=is%20able%20to-,synchronize,-your%20data%20model
    synchronize: isDev
} as const

console.log(`Connecting to ${options.database} db in ${isDev ? 'dev' : 'prod'} mode (synchronize: ${isDev})`)

const config = {
    ...options,
    synchronize: isDev, // createDatabase overwrites original synchronize value
    autoLoadEntities: true
}

export default registerAs('typeorm', () => config)
export const connectionSource = new DataSource(config as DataSourceOptions)
