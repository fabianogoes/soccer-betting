# ⚽️ World Cup

 🎯 This Project is about FIFA World Cup, should be able to manage: Teams, Groups, Matches, Users, Bets, Rules, Statistics, etc... 

> ℹ️ This project was created as a study base for the Go language and its main frameworks and libraries. It's an open source project, so feel free to participate with ideas and code by creating issues and submitting pull requests.

- [⚽️ World Cup](#️-world-cup)
  - [Stack](#stack)
  - [Run](#run)
    - [Dependencias](#dependencias)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Mock Backend](#mock-backend)


## Stack
- [Golang | Backend](./banckend/README.md)
- [ReactJS | Frontend](./banckend/README.md)

## Run
> TODO: criar um Makefile

### Dependencias
- [Setup Golang](https://www.practical-go-lessons.com/chap-4-setup-your-dev-environment)
- [Setup Yarn](https://yarnpkg.com/getting-started)

### Backend

```bash
cd backend
go mod tidy # install dependencies
go run cmd/main.go # running backend project
```

### Frontend

```bash
yarn # install dependencies
yarn dev # rinning frontend project
```

### Mock Backend

Para rodar o front end com o backend mockado, e não precisar instalar Golang local

```bash
cd frontend
yarn # install dependencies
yarn mock # running mock backend
yarn dev # rinning frontend project
```