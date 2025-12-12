"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfigLoader = void 0;
const common_1 = require("@nestjs/common");
let DatabaseConfigLoader = class DatabaseConfigLoader {
    constructor() {
        const env = (process.env.DB_ENV || 'TEST');
        this._environment = env;
        const urlMap = {
            TEST: process.env.MSSQL_TEST_URL,
            LIVE: process.env.MSSQL_LIVE_URL,
            LOCAL: process.env.MSSQL_LOCAL_URL,
        };
        const url = urlMap[env];
        if (!url) {
            if (process.env.DATABASE_URL) {
                this._connectionUrl = process.env.DATABASE_URL;
            }
            else {
                console.warn(`[DatabaseConfig] Missing schema URL for ${env}. Ensure MSSQL_${env}_URL is set.`);
                this._connectionUrl = process.env.DATABASE_URL || '';
            }
        }
        else {
            this._connectionUrl = url;
        }
        console.log(`[DatabaseConfig] Environment: ${this._environment}`);
    }
    get environment() {
        return this._environment;
    }
    get connectionUrl() {
        return this._connectionUrl;
    }
};
exports.DatabaseConfigLoader = DatabaseConfigLoader;
exports.DatabaseConfigLoader = DatabaseConfigLoader = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DatabaseConfigLoader);
//# sourceMappingURL=database.config.js.map