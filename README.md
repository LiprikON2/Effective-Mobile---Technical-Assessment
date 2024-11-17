

### Running

#### 1. Set up environment variables

```bash
cp .env.example .env
```

#### 2. Run `docker-compose`

```bash
docker-compose --profile dev up --build --watch
```

```bash
docker-compose --profile prod up --build
```

#### 3. Interact with containers

-   Stock service
    -   http://localhost:3030/
-   Stock history service
    -   http://localhost:3031/
-   Shared PostgreSQL `store` database
    -   `psql postgres://user:password@localhost:15432/store`


### Making migrations

For auth
```bash
(cd ./auth && npm run migrate:make -- init)
```

For stock
```bash
(cd ./stock && npm run migrate:make -- init)
```