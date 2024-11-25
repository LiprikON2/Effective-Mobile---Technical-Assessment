import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

import UserSeeder from './seeders/user.seeder'
import SeederFactory from './factories/user.factory'
import { User } from '../users/entities/user.entity'

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,

    entities: [User],
    seeds: [UserSeeder],
    factories: [SeederFactory]
}
export const dataSource = new DataSource(options)
