import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
    Put
} from '@nestjs/common'

import { ApiPaginatedResponse } from '../common/decorators'
import { PageDto, PageOptionsDto } from '../common/dtos'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto)
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiPaginatedResponse(User)
    async findAll(@Query() pageOptionsDto: PageOptionsDto): Promise<PageDto<User>> {
        return this.usersService.findAll(pageOptionsDto)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(+id)
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(+id)
    }

    @Put('reset-issues')
    async resetIssues() {
        return this.usersService.resetAndCountIssues()
    }
}
