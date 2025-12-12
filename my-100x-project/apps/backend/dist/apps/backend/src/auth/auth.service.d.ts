import { UsersService } from '../users/users.service';
import { CreateUserDto, User, AuthResponseDto } from '@repo/schema';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: User): Promise<AuthResponseDto>;
}
