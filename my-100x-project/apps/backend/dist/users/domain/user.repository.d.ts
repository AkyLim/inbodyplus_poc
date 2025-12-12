import { IRepository } from '../../shared/domain/base.repository';
import { User } from './user.model';
export interface UserRepository extends IRepository<User> {
    findByEmail(email: string): Promise<User | null>;
}
export declare const UserRepository: unique symbol;
