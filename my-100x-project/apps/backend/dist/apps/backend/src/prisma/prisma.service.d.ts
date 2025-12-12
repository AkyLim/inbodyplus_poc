import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { IDatabaseConfig } from '../config/database.config.interface';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly dbConfig;
    constructor(dbConfig: IDatabaseConfig);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
