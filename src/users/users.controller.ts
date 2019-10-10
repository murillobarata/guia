import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    finOne(@Param() params): Promise<User> {
        return this.userService.findOne(params.id); 
    }

    // @Get('email/:email')
    // finByEmail(@Param() params): Promise<User> {
    //     return this.userService.findByEmail(params.email); 
    // }

    @Get(':id/posts')
    finOneWithPosts(@Param() params): Promise<User> {
        return this.userService.findOneWithPosts(params.id); 
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
}
