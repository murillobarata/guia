import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}
    @Get()
    findAll() {
        return 'return all users';
    }

    @Get(':id')
    finOne(@Param() params) {
        return 'return user #${params.id}'; 
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
        return 'create new user named: ' + createUserDto.name;
    }

    @Put(':id')
    edit(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return 'edit user #${id}';
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return 'remove user #${id}';
    }
}
