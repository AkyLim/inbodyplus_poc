
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto, AuthResponseDto } from '../shared';
import { User } from '../users/domain/user.model';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService) { }

    async signup(createUserDto: CreateUserDto): Promise<User> {
        // Check if user exists (omitted for brevity in PoC, but good to have)
        const existing = await this.usersService.findOne(createUserDto.email);
        if (existing) {
            throw new Error('User already exists');
        }
        return this.usersService.create(createUserDto);
    }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<AuthResponseDto> {
        // Mock JWT generation: Base64 encode the user ID
        // In real app, use @nestjs/jwt
        const payload = { username: user.email, sub: user.id };
        const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');

        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                nickname: user.name ?? '',
            },
        };
    }
}
