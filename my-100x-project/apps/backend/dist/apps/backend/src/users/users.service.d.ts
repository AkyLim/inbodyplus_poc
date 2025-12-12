import { CreateUserDto } from '../shared';
import { UserRepository } from './domain/user.repository';
import { User } from './domain/user.model';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    create(createUserDto: CreateUserDto): Promise<User>;
    findOne(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}
