# ⚽️ Soccer Betting - Backend
![Golang](../assets/badge-golang.png)
![Postgres](../assets/badge-postgres.png)
![Gin](../assets/badge-gingonic.png)

> ℹ️ This project was created as a study base for the Go language and its main frameworks and libraries. It's an open source project, so feel free to participate with ideas and code by creating issues and submitting pull requests.

- [⚽️ Soccer Betting - Backend](#️-soccer-betting---backend)
  - [Stack](#stack)
  - [Create and configuration project](#create-and-configuration-project)
  - [Setup development](#setup-development)
  - [Structure](#structure)


## Stack
- [Golang](https://go.dev/)
- [Zap Logger](https://github.com/uber-go/zap)
- [Viper Environment Variables](https://github.com/spf13/viper)
- [Gin Web Framework](https://gin-gonic.com/)
- [Database Postgres](https://www.postgresql.org/docs/)
- [ORM Gorm](https://gorm.io/index.html)
- [ElephantSQL - PostgreSQL as a Service](https://www.elephantsql.com/)
- [TablePlus - GUI tool for relational databases](https://tableplus.com/)

## Create and configuration project
- [x] [Setup Golang](https://www.practical-go-lessons.com/chap-4-setup-your-dev-environment)  `mkdir soccer-betting && cd soccer-betting && go mod init soccer-betting`
- [x] [Setup Environment Variables]() `go get github.com/spf13/viper`
- [x] [Setup Web API](https://gin-gonic.com/docs/)  `go get -u github.com/gin-gonic/gin`
- [x] [Setup Logger](https://github.com/uber-go/zap) `go mod init soccer-betting`
- [x] [Setup Database/GORM](https://gorm.io/docs/index.html)
  - `go get -u gorm.io/gorm`
  - `go get -u gorm.io/driver/postgres`

## Setup development
- Install Go
- Clone project `git clone https://github.com/fabianogoes/soccer-betting && cd soccer-betting`
- Download dependency `soccer-betting`
- Let's Code!

## Structure

```
api/ - handlers, routers
|-dto - request models, response models 
cmd/ - bootstrap application
domain/
|-models - Domain classes(entitites...)
|-usecases - Business rules
configuration/ - Frameworks and lib settings: database, loading environments variables, logging, web server, etc...
```