import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
            private readonly userRepository: Repository<User>,
        ) {}
        
    create(user: User) {
        console.log(user);
        return this.userRepository.save(user);
    }
    
    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    findByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({email: email});
    }

    findOneWithPosts(id: number): Promise<User> {
        return  this.userRepository.findOne(id, {relations: ["posts"]});
    }

    findOneWithGuideServices(id: number): Promise<User> {
        return  this.userRepository.findOne(id, {relations: ["guideServices"]});
    }

    async update(id: number, userDto: UpdateUserDto) {
        let userToUpdate = await this.userRepository.findOne(id);
        userToUpdate.name = userDto.name;
        userToUpdate.password = userDto.password;
        userToUpdate.updatedAt = new Date();

        await this.userRepository.save(userToUpdate);
        return userToUpdate;
    }

    async remove(id: number) {
        let userToRemove = await this.userRepository.findOne(id);
        return await this.userRepository.remove(userToRemove);
    }
}
