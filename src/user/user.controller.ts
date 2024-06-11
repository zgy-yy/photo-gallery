import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }
    @Get()
    getUsers() {
        return this.userService.getUsers()
    }

    @Post()
    addUser(@Body() dto: any) {
    }
}
