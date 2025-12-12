import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findOne(uid: string): Promise<any>;
    create(createUserDto: any): string;
    findAll(): string;
    update(id: number, updateUserDto: any): string;
    remove(id: number): string;
}
