import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): any;
    getByUid(id: string): Promise<import("./domain/user.model").User>;
}
