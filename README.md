# ⚽️ Soccer Betting

 🎯 This Project is about FIFA World Cup, should be able to manage: Teams, Groups, Matches, Users, Bets, Ranking, Rules, Statistics, etc... 

<img src="./assets/badge-golang.png" width="60" height="100" />
<img src="./assets/badge-postgres.png" width="60" height="100" />
<img src="./assets/badge-gingonic.png" width="60" height="100" />
<img src="./assets/badge-react.png" width="60" height="100" />
<img src="./assets/badge-typescript.png" width="60" height="100" />
<img src="./assets/badge-vite.png" width="60" height="100" />
<img src="./assets/badge-materialui.png" width="60" height="100" />

> ℹ️ This project was created as a study base for the Go language and its main frameworks and libraries. It's an open source project, so feel free to participate with ideas and code by creating issues and submitting pull requests.

- [⚽️ Soccer Betting](#️-soccer-betting)
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
