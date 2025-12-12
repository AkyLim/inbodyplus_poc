import { User } from './user.model';

export interface UserRepository {
    findById(id: string): Promise<User | null>;
    // Add other methods as needed later (findByEmail, create, etc.)
}

export const UserRepository = Symbol('UserRepository'); // Token for DI
