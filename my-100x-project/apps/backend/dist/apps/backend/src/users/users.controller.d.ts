import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): any;
    getByUid(id: string): Promise<{
        password: any;
        id: string;
        loginId: string;
        email: string;
        phoneNumber?: string | null;
        countryCode: string;
        profileType: string;
        gender: string;
        birthDay: Date;
        height: number;
        name?: string | null;
        profileImgUrl?: string | null;
        createAccountDate: Date;
        recentMeasureDate?: Date | null;
        recentLoginDate?: Date | null;
        role: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
