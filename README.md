# Effective Mobile - Technical Assessment


## [Postman docs](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment)


### Задание 1

> Нужно реализовать 2 сервиса


#### Сервис остатков товаров в магазине

> [!note] `stock`
> - Language: JavaScript
> - Framework: Feathers.js
> - HTTP framework: Koa.js
> - SQL Query Builder: Knex.js
> - DBMS: PostgreSQL


 У товара могут быть следующие поля:

- PLU - артикул товара
- Название товара
- Количество товара на полке
- Количество товара в заказе
- Для какого магазина данный остаток


> [!warning] Данные денормализованы, их нужно привести к 2-3 нормальной форме

#### Таблицы после нормализации
> - [Остатки товара | kassa.bifit.com](https://kassa.bifit.com/wiki/index.php?title=%D0%9E%D1%81%D1%82%D0%B0%D1%82%D0%BA%D0%B8_%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%B0)

##### Таблица остатков
> `stocks`

- `id` - первичный ключ
- `product_id` - товар остатка
- `shop_id` - магазин остатка
- `shelf_quantity` - количество остатка на полках
- `ordered_quantity` - количество товара в заказе

### Таблица товаров
> `products`

- `id` - первичный ключ
- `plu` - артикул товара
- `name` - название товара

#### Таблица магазинов
> `shops`

- `id` - первичный ключ
- `name` - название магазина


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
        - Не сделано
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


#### Cервис истории действий с товарами


> [!note] `stock-history`
> - Language: TypeScript
> - Framework: Feathers.js
> - HTTP framework: Koa.js
> - SQL Query Builder: Knex.js
> - DBMS: PostgreSQL



В сервис "истории действий с товарами" нужно отправлять все события, которые происходят с товарами или остатками. Общение сервисов может происходить любым способом. 

Сервис "истории действий с товарами или остатками" должен иметь endpoint, который отдаст историю действий с фильтрами по:

- `shop_id`
- `plu`
- `date` (с-по)
- `action`

и постраничной навигацией. Фреймворк так же может быть любой, но не nest. Один из сервисов должен быть на JS, для второго можно использовать TS. СУБД - postgresql



### Running

#### 1. Set up environment variables

```bash
cp .env.example .env
```

#### 2. Run `docker-compose`


Development (w/ hot reloading)
```bash
docker-compose --profile dev up --build --watch
```

Production
```bash
docker-compose --profile prod up --build
```

#### 3. Interact with containers

- Auth service swagger docs
    - http://localhost:3029/docs
- Stock service swagger docs
    - http://localhost:3030/docs
- Stock history service swagger docs
    - http://localhost:3031/docs
- Shared PostgreSQL `store` database
    - `psql postgres://user:password@localhost:15432/store`



### Development

Install dependencies locally (for IntelliSense)

```bash
(cd stock && npm i) & (cd auth && npm i)
```

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


### Structure

#### [Database-per-Service vs Shared Instance](https://mts88.medium.com/database-per-service-or-shared-database-e73cfb756aa1)


- [Shared Database](https://microservices.io/patterns/data/shared-database.html)
- [Database per Service](https://microservices.io/patterns/data/database-per-service.html)
- [Knex and multiple databases](https://stackoverflow.com/a/57196477)