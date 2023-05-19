import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {CreateUserDto} from "./dto/create-user.dto";
import {EditUserDto} from "./dto/edit-user.dto";

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers() {
        return this.usersService.getAll()
    }

    @Get('/:id')
    getUser(@Param('id') id: string) {
        return this.usersService.getById(parseInt(id))
    }

    @Post()
    addUser(@Body() dto: CreateUserDto) {
        return this.usersService.add(dto.name)
    }

    @Delete('/:id')
    @HttpCode(204)
    removeUser(@Param('id') id: string) {
        this.usersService.remove(+id)
    }

    @Patch('/:id')
    editUser(@Body() dto: EditUserDto, @Param('id') id: string) {
        return this.usersService.edit(+id, dto.name)
    }
}
