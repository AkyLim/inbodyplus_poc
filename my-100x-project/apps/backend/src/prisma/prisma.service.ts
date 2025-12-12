import { Injectable, OnModuleInit, OnModuleDestroy, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { DATABASE_CONFIG, IDatabaseConfig } from '../config/database.config.interface';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor(
        @Inject(DATABASE_CONFIG) private readonly dbConfig: IDatabaseConfig
    ) {
        super({
            datasources: {
                db: {
                    url: dbConfig.connectionUrl,
                },
            },
        });
    }

    async onModuleInit() {
        console.log(`[PrismaService] Connecting to ${this.dbConfig.environment} database...`);
        await this.$connect();
        console.log(`[PrismaService] Connected successfully!`);
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
