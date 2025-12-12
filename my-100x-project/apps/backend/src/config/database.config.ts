import { Injectable } from '@nestjs/common';
import { IDatabaseConfig, DatabaseEnvironment } from './database.config.interface';

@Injectable()
export class DatabaseConfigLoader implements IDatabaseConfig {
    private readonly _environment: DatabaseEnvironment;
    private readonly _connectionUrl: string;

    constructor() {
        // 1. 환경변수에서 DB_ENV 읽기 (기본값: TEST)
        // NOTE: NestJS ConfigModule을 사용하는 경우 ConfigService를 주입받아 사용할 수도 있지만,
        // 여기서는 process.env를 직접 사용하여 단순화했습니다.
        // .env 파일이 애플리케이션 시작 전에 로드되어 있어야 합니다.
        const env = (process.env.DB_ENV || 'TEST') as DatabaseEnvironment;
        this._environment = env;

        // 2. 환경에 맞는 URL 선택
        const urlMap: Record<DatabaseEnvironment, string | undefined> = {
            TEST: process.env.MSSQL_TEST_URL,
            LIVE: process.env.MSSQL_LIVE_URL,
            LOCAL: process.env.MSSQL_LOCAL_URL,
        };

        const url = urlMap[env];

        // 로컬 개발 등에서 URL이 없을 경우에 대한 방어 로직
        if (!url) {
            // 이미 process.env.DATABASE_URL이 설정되어 있다면 그것을 사용할 수도 있습니다.
            if (process.env.DATABASE_URL) {
                this._connectionUrl = process.env.DATABASE_URL;
            } else {
                // throw new Error(`Missing database URL for environment: ${env}`);
                // 일단 경고만 하고 빈 문자열을 두거나 에러를 던집니다. 
                // Prisma 초기화 시 에러가 날 것이므로 여기서 명확히 하는게 좋습니다.
                console.warn(`[DatabaseConfig] Missing schema URL for ${env}. Ensure MSSQL_${env}_URL is set.`);
                this._connectionUrl = process.env.DATABASE_URL || '';
            }
        } else {
            this._connectionUrl = url;
        }

        console.log(`[DatabaseConfig] Environment: ${this._environment}`);
    }

    get environment(): DatabaseEnvironment {
        return this._environment;
    }

    get connectionUrl(): string {
        return this._connectionUrl;
    }
}
