# ⚽️ Soccer Betting

 🎯 This Project is about FIFA World Cup, should be able to manage: Teams, Groups, Matches, Users, Bets, Ranking, Rules, Statistics, etc... 

![Golang](./assets/badge-golang.png)
![Postgres](./assets/badge-postgres.png)
![Gin](./assets/badge-gingonic.png)
![React](./assets/badge-react.png)
![TypeScript](./assets/badge-typescript.png)
![Vite](./assets/badge-vite.png)
![Material UI](./assets/badge-materialui.png)

> ℹ️ This project was created as a study base for the Go language and its main frameworks and libraries. It's an open source project, so feel free to participate with ideas and code by creating issues and submitting pull requests.

- [⚽️ Soccer Betting](#️-soccer-betting)
  - [Stack](#stack)
  - [Run](#run)
    - [Dependencias](#dependencias)
    - [Backend](#backend)
    - [Frontend](#frontend)
    - [Mock Backend](#mock-backend)


## Stack
- [Backend | Golang...](./banckend/README.md)
- [Frontend | ReactJS...](./banckend/README.md)

## Run
- [ ] TODO: create a Makefile

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

To run the frontend with the mocked backend, and not need to install Golang locally

```bash
cd frontend
yarn # install dependencies
yarn mock # running mock backend
yarn dev # rinning frontend project
```
