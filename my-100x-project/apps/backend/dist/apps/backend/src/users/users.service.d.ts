import { CreateUserDto, User } from '../shared';
export declare class UsersService {
    private readonly users;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
}
