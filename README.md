# Guia - Projeto base Node.JS

#### 1. Estrutura do código
	src
		- app
			-- app.module.ts
			-- main.ts
			-- users
				-- dto
					-- createUser.dto.ts
					-- updateUser.dto.ts
				-- user.module.ts
				-- user.entity.ts
				-- user.service.ts
				-- user.controller.ts

#### 2.  Dependências
- NestJS
- TypeORM
- Express
- PG (PostgreSQL)
- Passport

------------
#### Comandos NestJS
###### Executar Aplicação
```shell
npm run start
```
###### Criar Controller
```shell
nest g controller users
```

###### Criar Service
```shell
nest g service users
```

###### Criar Module
```shell
nest g module users
```

------------

#### Métodos TypeORM 
###### Criar 
```javascript
this.userRepository.insert(user);
```

###### Listar Todos
```javascript
this.userRepository.find();
```

###### Listar Um
```javascript
this.userRepository.findOne(id);
```

###### Editar
```javascript
let userToUpdate = await this.userRepository.findOne(id);
userToUpdate.name = userDto.name;
userToUpdate.password = userDto.password;
userToUpdate.updatedAt = new Date();

await this.userRepository.save(userToUpdate);
```

------------
#### Etapas para CRUD básico 
1. Criar controller;
2. Criar Service;
3. Criar Module;
4. Criar Entity;
5. Adicionar o service no construtor do controller:
	5.1 Criar uma pasta dto;
	5.2 Criar uma classe para o corpo da requisição POST (create);
	5.3 Criar uma classe para o corpo da requisição PUT (update);
6.  Adicionar os métodos básicos:
```javascript
    @Get()
    findAll() {

    }

    @Get(':id')
    findOne(@Param() params) {

    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        
    }

    @Put(':id')
    edit(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        
    }

    @Delete(':id')
    remove(@Param('id') id: number) {

    }
```

7.  Configurar Module:
```javascript
@Module({
	imports: [TypeOrmModule.forFeature([User])],
	controllers: [UsersController],
	providers: [UsersService]
})
```

8. Adicionar a entidade em app.module.ts > entities: [];
9. Criar construtor para Service:
```javascript
constructor(
	@InjectRepository(User)
	private readonly userRepository: Repository<User>,
) { }
```
9.1. Criar métodos CRUD:
```javascript
	create(user: User) {
		return this.userRepository.insert(user);
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.userRepository.findOne(id);
	}

	async update(id: number, userDto: UpdateUserDto) {
		let userToUpdate = await this.userRepository.findOne(id);
		userToUpdate.name = userDto.name;
		userToUpdate.password = userDto.password;
		userToUpdate.createdAt = new Date();

		await this.userRepository.save(userToUpdate);
		return userToUpdate;
	}

	async remove(id: number) {
		let userToRemove = await this.userRepository.findOne(id);
		return await this.userRepository.remove(userToRemove);
	}
```

10. Alterar Controller:
```javascript
	@Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    finOne(@Param() params): Promise<User> {
        return this.userService.findOne(params.id); 
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        var user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        this.userService.create(user);
        return user;
    }

    @Put(':id')
    edit(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
```
------------
#### Relacionamento entre entidades
##### @JoinColumn() - em relacionamentos OneToOne/ManyToMany
- Esse decorator deve ser utilizado somente em um lado do relacionamento.
- O lado em que ele for utilizado será o dono do relacionamento.
- O dono do relacionamento conterá uma coluna com uma chave estrangeira no banco de dados.

##### @OneToMany()
- OneToMany é sempre o lado inverso da relação e não pode existir sem o ManyToOne no outro lado da relação.

##### Carregando objetos com seus relacionamentos:
- Caso não seja solicitado, o relacionamento não é carregado.

###### Métodos find* 
```javascript
@Entity()
export class PhotoMetadata {

    /* ... other columns */

    @OneToOne(type => Photo, photo => photo.metadata)
    @JoinColumn()
    photo: Photo;
}

@Entity()
export class Photo {

    /* ... other columns */

    @OneToOne(type => PhotoMetadata, photoMetadata => photoMetadata.photo)
    metadata: PhotoMetadata;
}

() => {
	let photos = await photoRepository.find({ relations: ["metadata"] });
	// Aqui teremos um array de fotos do banco de dados e, em cada foto, teremos um metadata do relacionamento.
}
```

###### QueryBuilder
```javascript
createConnection(/*...*/).then(async connection => {

    /*...*/
    let photos = await connection
            .getRepository(Photo)
            .createQueryBuilder("photo")
            .innerJoinAndSelect("photo.metadata", "metadata")
            .getMany();


}).catch(error => console.log(error));
```
