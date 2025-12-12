import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../shared';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<import("../users/domain/user.model").User>;
    login(loginDto: LoginDto): Promise<{
        accessToken?: string;
        user?: {
            id?: string;
            email?: string;
            nickname?: string;
        };
    }>;
}
