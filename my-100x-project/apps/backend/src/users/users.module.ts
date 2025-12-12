
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaUserRepository } from './infrastructure/prisma-user.repository';
import { UserRepository } from './domain/user.repository';

@Module({
    controllers: [UsersController],
    providers: [
        UsersService,
        {
            provide: UserRepository,
            useClass: PrismaUserRepository,
        },
    ],
    exports: [UsersService],
})
export class UsersModule { }
