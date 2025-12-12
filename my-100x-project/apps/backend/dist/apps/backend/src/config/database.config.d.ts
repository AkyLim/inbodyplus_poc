import { IDatabaseConfig, DatabaseEnvironment } from './database.config.interface';
export declare class DatabaseConfigLoader implements IDatabaseConfig {
    private readonly _environment;
    private readonly _connectionUrl;
    constructor();
    get environment(): DatabaseEnvironment;
    get connectionUrl(): string;
}
