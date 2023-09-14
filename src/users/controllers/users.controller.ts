import {
    Controller,
    Body,
    Param,
    Get,
    Post,
    Put,
    Delete,
    ParseIntPipe
} from '@nestjs/common';

import { UsersService } from '../services/users.service';

import { CreateUserDto, UpdateUserDto} from 'src/dtos/users.dto';
import { CreateUserProfileDto } from 'src/dtos/user-profiles.dto';

// import { CreateUserDto } from '../../dtos/users/CreateUser.dto';
// import { UpdateUserDto } from '../../dtos/users/UpdateUser.dto';
// import { CreateUserProfileDto } from '../../dtos/user-profiles/CreateUserProfile.dto';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.userService.index()
    }

    @Get(':id')
    async getUserDetails(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.show(id);
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.store(createUserDto);
    }

    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto
    ) {
        return await this.userService.update(id, updateUserDto);
    }

    @Delete(':id')
    async deleteUser(@Param('id', ParseIntPipe) id: number) {
        return await this.userService.delete(id);
    }

    @Post(':id/profiles')
    createUserProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.userService.storeProfile(id, createUserProfileDto);
    }

    @Post(':id/profiles')
    createUserPost(
        @Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDto: CreateUserProfileDto
    ) {
        return this.userService.storePost(id, createUserProfileDto);
    }

}
