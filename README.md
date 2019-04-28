# Setlist Spy (React Web App)

Frontend for [Setlist Spy API](https://github.com/coreybobco/setlistspy-api)

### Features
- Search for all tracks ever played by a DJ according to MixesDB.com derived dataset
- Search for all tracks by an artists ever played by any DJ according to MixesDB.com derived dataset
- Kubernetes deployment in API repository

### Running Locally
- Using the cloud-hosted backend
```
docker-compose -f local-with-production-backend.yml build
docker-compose -f local-with-production-backend.yml up
```
- Using a locally hosted backend (does not come pre-loaded with data, must be seeded)
```
docker-compose -f local.yml build
docker-compose -f local.yml up
```
