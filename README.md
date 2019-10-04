# GuiaMed - Projeto exemplo Node.JS

#### 1. Estrutura do código
- src
	- app
		- controllers
		- models
		- dao
		- dto
		- routes
	- database
		- migrations
		- seeders
	- config

#### 2.  Dependências
- TypeORM
- Express
- PG (PostgreSQL)
- Passport

------------

#### Comandos 
###### Criar Migration
`node_modules/.bin/sequelize migration:create --name=create-users`

###### Executar Migration
`node_modules/.bin/sequelize db:migrate`

------------


