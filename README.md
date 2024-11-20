


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

- Stock service
    - http://localhost:3030/
- Stock history service
    - http://localhost:3031/
- Shared PostgreSQL `store` database
    - `psql postgres://user:password@localhost:15432/store`



### Development

Install dependencies locally (for IntelliSense)

```bash
(cd stock && npm i) & (cd auth && npm i)
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

2. Manually update `up` and `down` functions ([Example](https://feathersjs.com/guides/basics/schemas#creating-a-migration))


### Structure

#### [Database-per-Service vs Shared Instance](https://mts88.medium.com/database-per-service-or-shared-database-e73cfb756aa1)


- [Shared Database](https://microservices.io/patterns/data/shared-database.html)
- [Database per Service](https://microservices.io/patterns/data/database-per-service.html)
- [Knex and multiple databases](https://stackoverflow.com/a/57196477)