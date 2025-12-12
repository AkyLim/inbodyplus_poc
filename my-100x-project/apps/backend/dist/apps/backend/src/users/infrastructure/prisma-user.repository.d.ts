import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.model';
import { PrismaService } from '../../prisma/prisma.service';
export declare class PrismaUserRepository implements UserRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    findAll(): Promise<User[]>;
    create(entity: Partial<User>): Promise<User>;
    update(id: string, entity: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
    private toDomain;
}
