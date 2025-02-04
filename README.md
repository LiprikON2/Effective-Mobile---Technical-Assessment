# Technical Assessment from Effective Mobile - Store stocks


- [Effective Mobile - Technical Assessment](#effective-mobile---technical-assessment)
  - [Postman docs](#postman-docs)
  - [Running](#running)
    - [1. Set up environment variables](#1-set-up-environment-variables)
    - [2. Run `docker-compose`](#2-run-docker-compose)
      - [Development mode (w/ hot reloading)](#development-mode-w-hot-reloading)
      - [Production mode](#production-mode)
    - [3. Interact with containers](#3-interact-with-containers)
  - [Задание 1](#задание-1)
    - [Сервис остатков товаров в магазине](#сервис-остатков-товаров-в-магазине)
      - [Таблицы после нормализации](#таблицы-после-нормализации)
        - [Таблица остатков](#таблица-остатков)
        - [Таблица товаров](#таблица-товаров)
        - [Таблица магазинов](#таблица-магазинов)
      - [Endpoints](#endpoints)
    - [Cервис истории действий с товарами](#cервис-истории-действий-с-товарами)
      - [Tаблицы](#tаблицы)
        - [Таблица истории действий с товарами](#таблица-истории-действий-с-товарами)
        - [Таблица истории действий с остатками](#таблица-истории-действий-с-остатками)
      - [Endpoints](#endpoints-1)
    - [Structure](#structure)
      - [Database-per-Service vs Shared Instance](#database-per-service-vs-shared-instance)
    - [Development](#development)
      - [Adding a service (generating CRUD table boilerplate)](#adding-a-service-generating-crud-table-boilerplate)
      - [Making migrations](#making-migrations)
      - [Adding a microservice](#adding-a-microservice)
  - [Задание 2](#задание-2)
    - [Сервис пользователей](#сервис-пользователей)
      - [Endpoints](#endpoints-2)
    - [Development](#development-1)
      - [Adding a service (generating CRUD table boilerplate)](#adding-a-service-generating-crud-table-boilerplate-1)
      - [Making migrations](#making-migrations-1)
      - [Seeding database](#seeding-database)


## [Postman docs](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment)


## Running

### 1. Set up environment variables

```bash
cp .env.example .env
```

### 2. Run `docker-compose`


#### Development mode (w/ hot reloading)

All microservices

```bash
docker-compose --profile dev up --build --watch
```

Single microservice in development mode

```bash
docker-compose up stock-dev --build --watch
```

```bash
docker-compose up user-dev --build --watch
```


#### Production mode

```bash
docker-compose --profile prod up --build
```

Running migrations (must be run at least once for production)

```bash
docker compose run --rm stock npm run migrate
```

```bash
docker compose run --rm stock-history npm run migrate
```

```bash
docker compose run --rm user npm run migrate
```


### 3. Interact with containers

- Stock microservice swagger docs
    - http://localhost:3030/docs
- Stock history microservice swagger docs
    - http://localhost:3031/docs
- User microservice
    - http://localhost:3000/docs
- PostgreSQL database
    - `psql postgres://user:password@localhost:15432/postgres`
    - Database `stock`
        - Table `stocks`
    - Database `stock-history`
        - Table `stocks-history`
    - Database `user`
        - Table `users`
- RabbitMQ



## Задание 1
> Нужно реализовать 2 сервиса


### Сервис остатков товаров в магазине

> [!NOTE]
> Microservice `stock`
> - Language: JavaScript
> - Framework: Feathers.js
> - HTTP platform: Koa.js
> - SQL Query Builder: Knex.js
> - DBMS: PostgreSQL

![](https://i.imgur.com/7JDUmPs.png)


 У товара могут быть следующие поля:

- PLU - артикул товара
- Название товара
- Количество товара на полке
- Количество товара в заказе
- Для какого магазина данный остаток


> [!WARNING]
> Данные денормализованы, их нужно привести к 2-3 нормальной форме

#### Таблицы после нормализации
> - [Остатки товара | kassa.bifit.com](https://kassa.bifit.com/wiki/index.php?title=%D0%9E%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B8_%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0)

##### Таблица остатков
> `stocks`

- `id` - первичный ключ
- `product_id` - товар остатка
- `shop_id` - магазин остатка
- `shelf_quantity` - количество остатка на полках
  - Constraint: `shelf_quantity >= 0`
- `ordered_quantity` - количество товара в заказе
  - Constraint: `ordered_quantity >= 0`
- `total_quantity` - общее количество товара
  - Constraint: `shelf_quantity + ordered_quantity <= total_quantity`
- `created_at` - дата создания остатка
 
##### Таблица товаров
> `products`

- `id` - первичный ключ
- `plu` - артикул товара
- `name` - название товара

##### Таблица магазинов
> `shops`

- `id` - первичный ключ
- `name` - название магазина


#### Endpoints

Должны быть следующие endpoint'ы:

- Создание товара 
  - [`POST localhost:3030/products`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-bd8a982b-58a2-4860-8d5e-cdba46bfafbe)
- Создание остатка
	- [`POST localhost:3030/stocks`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-bbe2eba6-025f-4c5f-b029-e2183a635079)
- Увеличение остатка
  - [`PATCH localhost:3030/stocks/1`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-4a8feef8-4ba4-4967-bcad-734e4a56e1c5)
- Уменьшение остатка
  - [`PATCH localhost:3030/stocks/2`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-dbbaa8ed-74a9-4fac-b847-5ee2acc1dbf7)
- Получение остатков по фильтрам
    - `plu`
        - [`GET localhost:3030/stocks?product.plu=1233`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?entity=request-6b9782b9-d842-4233-953d-883be206372c)
    - `shop_id`
      - [`GET localhost:3030/stocks?shop_id=1`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-fc7f0734-a44c-4696-a311-3733e8aa3a49)
    - количество остатков на полке (с-по)
      - [`GET localhost:3030/stocks?$and[0][shelf_quantity][$gte]=2&$and[1][shelf_quantity][$lte]=10`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-ccf93c08-15f8-44bc-9d94-84ec01da14ef)
    - количество остатков в заказе (с-по)
      - [`GET localhost:3030/stocks?$and[0][ordered_quantity][$gte]=0&$and[1][ordered_quantity][$lte]=2`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-bdb0fd0a-87ae-452f-9d3e-bf9ee7f1c3d3)
- Получение товаров
    - [`GET localhost:3030/products`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-2fb83aeb-21fc-413f-9861-6b724f65005d)
    - по фильтрам
        - `name`
          - [`GET localhost:3030/products?name=Condenced%20Milk`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-97aecb31-9972-4888-bd4f-80e5f34e6277)
          - [`GET localhost:3030/products?name[$ilike]=%milk%`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-e6934dcd-368e-4509-9a82-864e7f05c19e)
        - `plu`
            - [`GET localhost:3030/products?plu=9999`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-d8a435a0-e85d-46f0-b7f4-6e2eedc72def)


### Cервис истории действий с товарами


> [!NOTE]
> Microservice `stock-history`
> - Language: TypeScript
> - Framework: Feathers.js
> - HTTP platform: Koa.js
> - SQL Query Builder: Knex.js
> - DBMS: PostgreSQL

![](https://i.imgur.com/MdPIPFP.png)



В сервис "истории действий с товарами" нужно отправлять все события, которые происходят с товарами или остатками. Общение сервисов может происходить любым способом. 

#### Tаблицы

##### Таблица истории действий с товарами
> `products-history`

- `id` - первичный ключ
- `action` - действие (`created`, `patched`, `updated`, `deleted`)
- `timestamp` - дата внесения изменения
- `result_id` - первичный ключ товара
- `name` - название товара
- `plu` - артикул товара

##### Таблица истории действий с остатками
> `stocks-history`

- `id` - первичный ключ
- `action` - действие (`created`, `patched`, `updated`, `deleted`)
- `timestamp` - дата внесения изменения
- `result_id` - первичный ключ остатка
- `product_id` - товар остатка
- `shop_id` - магазин остатка
- `created_at` - дата создания остатка
- `shelf_quantity` - количество остатка на полках
- `ordered_quantity` - количество товара в заказе
- `total_quantity` - общее количество товара




#### Endpoints
Сервис "истории действий с товарами или остатками" должен иметь endpoint, который отдаст историю действий с фильтрами по:

- `shop_id`
  - [`GET localhost:3031/stocks-history?shop_id=1`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-2e4a1d43-d86a-4fa9-9f8e-ff075b54c16e)
- `plu`
  - [`GET localhost:3031/products-history?plu=9999`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-791d6adf-c5b3-4042-a8f2-4e0a87115d74)
- `date` (с-по)
  - [`GET localhost:3031/products-history?$and[0][timestamp][$gte]=1732283898867&$and[1][timestamp][$lte]=1732283898978`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-bfa9472f-bdbe-49e8-bf55-3da448385f83)
- `action`
  - [`GET localhost:3031/stocks-history?action=patched`](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143&entity=request-261d586b-3bb8-4e82-b9f6-fc11dc9c5a93)

и постраничной навигацией. Фреймворк так же может быть любой, но не nest. Один из сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql



### Structure

#### [Database-per-Service vs Shared Instance](https://mts88.medium.com/database-per-service-or-shared-database-e73cfb756aa1)

- [Knex and multiple databases](https://stackoverflow.com/a/57196477)



### Development

Install dependencies locally (for IntelliSense)

```bash
(cd stock && npm i) & (cd stock-history && npm i)
```

#### Adding a service (generating CRUD table boilerplate)

```bash
(cd ./stock && npx feathers generate service)
```

#### Making migrations

1. Generate empty migration
```bash
(cd ./stock && npm run migrate:make -- migration_name)
```

2. Manually fill up `up` and `down` functions ([Example](https://feathersjs.com/guides/basics/schemas#creating-a-migration))




#### Adding a microservice

```
npm create feathers@latest service-name
```

```
(cd service-name && npm install feathers-swagger swagger-ui-dist koa-mount koa-static)
```

```
(cd service-name && rm .gitignore .prettierrc)
```

```
(cd service-name && npx prettier --write .)
```

Modify `app.ts`:

```ts
import swagger from 'feathers-swagger'

// <...>

app.configure(
    swagger({
        docsPath: '/docs',
        specs: {
            info: {
                title: 'Microservice',
                description: 'Description',
                version: '1.0.0'
            },
            schemes: ['http', 'https']
        },
        ui: swagger.swaggerUI({})
    })
)
```


Add `Dockerfile`:
```docker
FROM node:lts-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Fix for npm install taking 10 minutes
# ref: https://forums.docker.com/t/npm-install-in-docker-tutorial-is-taking-forever/139328/13
RUN npm config set strict-ssl false

RUN npm install

COPY . .

EXPOSE 3030

CMD ["npm", "run", "start"]
```

Add `init-database.ts`:
```ts
import knex from 'knex'
import config from './knexfile'

async function createDatabase() {
    if (!config || typeof config.connection === 'string') return
    const { database } = config.connection

    // Establish connection using default postgres database
    config.connection.database = 'postgres'
    const db = knex(config)

    try {
        console.log(`CREATE DATABASE ${database}`)
        await db.raw(`CREATE DATABASE ${database}`)
    } catch (err) {
        // Ignore database already exists error
        // @ts-ignore
        if (!err.code === '42P04') throw err
    }

    await db.destroy()
}

createDatabase()
```

Modify `knexfile.ts`:
```ts
export default config
```

Modify `package.json`: 
```js
"migrate": "ts-node init-database && knex migrate:latest"
```





## Задание 2

### Сервис пользователей

> [!NOTE]
> Microservice `user`
> - Language: TypeScript
> - Framework: Nest.js
> - HTTP platform: Express.js
> - ORM: TypeORM
> - DBMS: PostgreSQL


![](https://i.imgur.com/HGjiMB7.png)

Нужно написать сервис, который работает с пользователями.

В бд может быть более 1 миллиона пользователей (набить данными бд нужно самостоятельно. Например, написать миграцию, которая это сделает). Каждый пользователь имеет поля:

- Имя
- Фамилия
- Возраст
- Пол
- проблемы: boolean // есть ли проблемы у пользователя

`user.entity.ts`
```ts
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    has_issues: boolean

    @Column({
        type: 'enum',
        enum: ['male', 'female']
    })
    gender: string

    @Column({ type: 'date' })
    birth_date: Date

    @Expose() // Makes the virtual properties visible in responses
    @Transform(({ obj }) => obj.getAge())
    age: number

    getAge(): number {
        return Math.floor(
            (new Date().getTime() - new Date(this.birth_date).getTime()) / (365.25 * 24 * 60 * 60 * 1000)
        )
    }
}
```

`user.factory.ts`
```ts
export default setSeederFactory(User, (faker) => {
    const user: Partial<User> = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        has_issues: faker.datatype.boolean({ probability: 0.3 }),
        gender: faker.helpers.arrayElement(['male', 'female']),
        birth_date: faker.date.between({ from: '1950-01-01', to: '2005-12-31' })
    }

    return user
})
```

`user.seeder.ts`
```ts
export default class UserSeeder implements Seeder {
    public async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<void> {
        const userFactory = factoryManager.get(User)

        faker.seed(42)

        const iterations = 10000
        const batchSize = 100
        const progressBar = new ProgressBar(iterations)
        console.log(`Generating ${iterations * batchSize} user entries...`)

        for (let i = 0; i < iterations; i++) {
            await progressBar.update(i)
            await userFactory.saveMany(batchSize)
        }
        progressBar.finish()
        console.log(`Finished seeding ${iterations * batchSize} users`)
    }
}
```

Генерация 1 000 000 пользователей, у 30% из которых стоит флаг имения проблемы

![](https://i.imgur.com/ygydYGr.png)


#### Endpoints

Нужно сделать endpoint, который проставить флаг проблемы у пользователей в false и посчитает, сколько пользователей имело true в этом флаге. Этот сервис нужно реализовать на nestjs

[`users.service.ts`](./user/src/users/users.service.ts)
```ts
async resetAndCountIssues() {
    const startTime = performance.now()

    const queryBuilder = this.usersRepository.createQueryBuilder('users')
    const result = await queryBuilder
        .update(User)
        .set({ has_issues: false })
        .where('has_issues = :value', { value: true })
        .execute()

    const executionTime = performance.now() - startTime

    return {
        updatedCount: result.affected,
        executionTimeMs: Math.round(executionTime * 100) / 100,
        message: `Successfully reset ${result.affected} users`
    }
}
```

[`PUT localhost:3000/users/reset-issues`]()
- ![](https://i.imgur.com/kcEiKGT.png)



### Development

Install dependencies locally (for IntelliSense)

```bash
(cd user && npm i)
```

#### Adding a service (generating CRUD table boilerplate)

```bash
(cd user && nest g resource my-service-name)
```

#### Making migrations

1. Run `user` container in prod mode
```bash
docker-compose up user --build
```

2. Generate migrations against db container
```bash
docker-compose build user && docker compose run --rm user npm run migrate:generate --name=migration_name
```

#### Seeding database


Generating and seeding (slow)
```bash
docker-compose build user-dev && docker compose run --rm user-dev npm run seed
```

or

Creating data dump of user.users table (fast)
```bash
docker exec -i store-db-1 bash -c "PGPASSWORD=password pg_dump -U user -n public -a -t users user" > ./user/src/database/dumps/user_users_dump.sql
```

Seeding from data dump (fast)
```bash
cat ./user/src/database/dumps/user_users_dump.sql | docker exec -i store-db-1 bash -c "PGPASSWORD=password psql -U user -d user"
```
