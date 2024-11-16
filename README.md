### Running

#### 1. Set up environment variables

```bash
cp .env.example .env
```

#### 2. Run `docker-compose`

```bash
docker-compose up --build
```

#### 3. Interact with containers
- Stock service
    - http://localhost:3030/
- Stock history service
    - http://localhost:3031/
- Shared PostgreSQL `store` database
    - `psql postgres://user:password@localhost:15432/store`
