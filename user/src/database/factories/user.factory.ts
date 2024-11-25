import { setSeederFactory } from 'typeorm-extension'
import { User } from '../../users/entities/user.entity'

export default setSeederFactory(User, (faker) => {
    const user: Partial<User> = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        has_issues: false,
        gender: faker.helpers.arrayElement(['male', 'female']),
        birth_date: faker.date.between({ from: '1950-01-01', to: '2005-12-31' })
    }

    return user
})
