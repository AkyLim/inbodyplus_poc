export type DatabaseEnvironment = 'TEST' | 'LIVE' | 'LOCAL';
export interface IDatabaseConfig {
    readonly environment: DatabaseEnvironment;
    readonly connectionUrl: string;
}
export declare const DATABASE_CONFIG: unique symbol;
