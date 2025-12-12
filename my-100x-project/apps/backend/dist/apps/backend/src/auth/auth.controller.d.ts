import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from '../shared';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        id?: string;
        email?: string;
        password?: string;
        nickname?: string;
        phoneNumber?: string;
        birthdate?: string;
        gender?: "MALE" | "FEMALE";
        height?: number;
        marketingConsent?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
    }>;
    login(loginDto: LoginDto): Promise<{
        accessToken?: string;
        user?: {
            id?: string;
            email?: string;
            nickname?: string;
        };
    }>;
}
