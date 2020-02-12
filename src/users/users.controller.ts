import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { join } from 'path';
import * as express from 'express';

import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { decodeBase64Image, fs, pathUrl } from './../utils/utils';
import { AuthGuard } from '@nestjs/passport';

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

    @Get(':id/guide-services')
    finOneWithGuideServices(@Param() params): Promise<User> {
        return this.userService.findOneWithGuideServices(params.id); 
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        var user = new User();
        user.name = createUserDto.name;
        user.email = createUserDto.email;
        user.password = createUserDto.password;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        if (createUserDto.profilePicture) {
            var imgName = user.name.replace(/[^A-Z0-9]+/ig, "_");
            imgName = imgName +'_'+user.updatedAt.getTime();
    
            var newProfilePic = decodeBase64Image(createUserDto.profilePicture);
            (await fs).writeFile(join(process.cwd() + '/static/images/profile/')+imgName+'.png', newProfilePic.data, (err) => console.log(err));
    
            user.profilePicture = pathUrl + '/images/profile/'+imgName+'.png';
        }
        
        this.userService.create(user);
        return user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    edit(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return this.userService.update(id, updateUserDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.userService.remove(id);
    }
}
