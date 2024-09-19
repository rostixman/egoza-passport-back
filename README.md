# Egoza Passport
## Описание
Сервис авторизации и регистрации новых пользователей на фреймворке [Nest](https://github.com/nestjs/nest)

## Стек
* NestJS
* Prisma
* PostgreSQL
* JWT
* Swagger

## Установка

```bash

# установка зависимостей
$ npm install

# генерация призма клиента 
$ npm run db:generate

# синхронизация состояния Prisma с БД
$ npm run db:push
```

## Запуск

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Egoza [MIT licensed](LICENSE).
