import { runSeeders, runSeeder } from 'typeorm-extension'
import { dataSource } from './data-source'

import UserSeeder from './seeders/user.seeder'
import SeederFactory from './factories/user.factory'
;(async () => {
    // ref: https://typeorm-extension.tada5hi.net/guide/seeding.html
    await dataSource.initialize()

    await runSeeders(dataSource)
    console.log('Seeding complete!')
})()
