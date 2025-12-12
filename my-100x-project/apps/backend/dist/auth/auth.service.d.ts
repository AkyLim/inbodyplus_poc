import { UsersService } from '../users/users.service';
import { CreateUserDto, AuthResponseDto } from '../shared';
import { User } from '../users/domain/user.model';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<User>;
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: User): Promise<AuthResponseDto>;
}
