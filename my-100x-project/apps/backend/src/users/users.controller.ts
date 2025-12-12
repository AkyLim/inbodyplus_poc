
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    getProfile(@Request() req) {
        // For PoC, we might mock this or implement a Guard later
        return req.user;
    }
}
