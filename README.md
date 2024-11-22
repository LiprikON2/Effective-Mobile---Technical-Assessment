# Effective Mobile - Technical Assessment


[Postman docs](https://www.postman.com/liprikon/effective-mobile-technical-assessment/documentation/xy0gcbl/effective-mobile-technical-assessment?workspaceId=d4697269-b18e-44d0-a0d8-07b2e8e02143)



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