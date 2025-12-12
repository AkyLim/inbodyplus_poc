import { Global, Module } from '@nestjs/common';
import { DatabaseConfigLoader } from './database.config';
import { DATABASE_CONFIG } from './database.config.interface';

@Global()
@Module({
    providers: [
        {
            provide: DATABASE_CONFIG,
            useClass: DatabaseConfigLoader,
        },
    ],
    exports: [DATABASE_CONFIG],
})
export class ConfigModule { }
