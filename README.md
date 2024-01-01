# Northcoders News API

## Demo link:
Access the API at https://news-o60m.onrender.com/api

## About the API
This API interacts with a news database which contains the following tables: articles, comments, topics and users. 

The endpoints for this API can be found in the endpoints.json file.

## Setup

To run this project install:
- Node 20.10.0
- Postgres 16.1

To run this project install the following dependencies:
devDependencies - husky, jest, jest-extended, pg-format.
dependencies - dotenv, express, jest-sorted, pg, supertest.

1.Clone the repo:
```
git clone https://github.com/royr5/nc-news.git
```
2.Install node modules:
```
npm install
```
3.Create two new files .env.test and .env.development to set up the environment variables:
```
.env.test
PGDATABASE=nc_news_test

.env.development
PGDATABASE=nc_news
```
4.Setup the database by running the following script:
```
npm run setup-dbs
```
4.Seed the database by running the following script:
```
npm run seed
```
5.Run tests using the script:
```
npm run test
```

