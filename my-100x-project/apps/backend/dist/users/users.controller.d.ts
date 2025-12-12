import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findOne(uid: string): Promise<any>;
    create(createUserDto: any): string;
    findAll(): string;
}
