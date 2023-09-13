import { Controller, Body, Get, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/CreateUser.dto';
import { UsersService } from '../services/users.service';
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    async getUsers() {
        return await this.userService.index()
    }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return await this.userService.store(createUserDto);
    }

}
