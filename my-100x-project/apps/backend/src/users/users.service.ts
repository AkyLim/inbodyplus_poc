
import { Injectable, Inject } from '@nestjs/common';
import { CreateUserDto } from '../shared';
import { UserRepository } from './domain/user.repository';
import { User } from './domain/user.model';

@Injectable()
export class UsersService {
    constructor(
        @Inject(UserRepository) private readonly userRepository: UserRepository
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        return this.userRepository.create(createUserDto as unknown as Partial<User>);
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userRepository.findByEmail(email);
        return user || undefined;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.userRepository.findById(id);
        return user || undefined;
    }
}
