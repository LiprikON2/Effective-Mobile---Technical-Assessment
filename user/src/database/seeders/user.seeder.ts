import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { DataSource } from 'typeorm'
import { faker } from '@faker-js/faker'

import { User } from '../../users/entities/user.entity'
import { ProgressBar } from '../progress-bar'

export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User)

        console.log('Generating 1 million user entries...')
        faker.seed(42)

        const iterations = 10000
        const progressBar = new ProgressBar(iterations)

        for (let i = 0; i < iterations; i++) {
            await progressBar.update(i)
            await userFactory.saveMany(100)
        }
        progressBar.finish()
        console.log('Finished seeding 1 million users')
    }
}
