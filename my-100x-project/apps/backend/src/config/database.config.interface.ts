export type DatabaseEnvironment = 'TEST' | 'LIVE' | 'LOCAL';

export interface IDatabaseConfig {
    readonly environment: DatabaseEnvironment;
    readonly connectionUrl: string;
}

export const DATABASE_CONFIG = Symbol('DATABASE_CONFIG');
