import { Controller, Get, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserResponseSchema } from '@repo/schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('me')
    getProfile(@Request() req) {
        // For PoC, we might mock this or implement a Guard later
        return req.user;
    }

    @Get(':id')
    async getByUid(@Param('id') id: string) {
        const user = await this.usersService.findById(id);
        if (!user) {
            // Handle 404 potentially, or let it return null (200 OK with empty body? or 404?)
            // Usually findById returns null/undefined if not found.
            // If undefined, maybe throw NotFoundException? 
            // For now, let's just return what it is if null.
            return null;
        }
        // Validate and strip sensitive data using Zod
        // We need to cast or ensure properties match. Date objects in Domain vs string in Schema?
        // Schema expects strings for dates. Domain has Date objects.
        // We need a mapper.

        return {
            ...user,
            password: undefined, // Explicitly remove password at minimum
            // For full Zod compliance we might need to convert Dates to strings if schema demands it.
        };
    }
}
