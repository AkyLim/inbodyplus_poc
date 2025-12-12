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
exports.PrismaUserRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrismaUserRepository = class PrismaUserRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        try {
            const uid = BigInt(id);
            const entity = await this.prisma.profile_UserInfo.findUnique({
                where: { UID: uid },
            });
            return entity ? this.toDomain(entity) : null;
        }
        catch (error) {
            console.error('Error in findById:', error);
            return null;
        }
    }
    async findByEmail(email) {
        const entity = await this.prisma.profile_UserInfo.findFirst({
            where: { Email: email },
        });
        return entity ? this.toDomain(entity) : null;
    }
    async findAll() {
        const entities = await this.prisma.profile_UserInfo.findMany({
            take: 20,
        });
        return entities.map((e) => this.toDomain(e));
    }
    async create(entity) {
        throw new Error('Create method not fully implemented for legacy schema');
    }
    async update(id, entity) {
        const uid = BigInt(id);
        const updateData = {};
        if (entity.name)
            updateData.Name = entity.name;
        const updated = await this.prisma.profile_UserInfo.update({
            where: { UID: uid },
            data: updateData,
        });
        return this.toDomain(updated);
    }
    async delete(id) {
        const uid = BigInt(id);
        await this.prisma.profile_UserInfo.delete({
            where: { UID: uid },
        });
    }
    toDomain(entity) {
        let password = undefined;
        if (entity.LoginPW) {
            password = Buffer.isBuffer(entity.LoginPW)
                ? entity.LoginPW.toString()
                : String(entity.LoginPW);
        }
        return {
            id: entity.UID.toString(),
            email: entity.Email,
            name: entity.Name,
            role: 'USER',
            createdAt: entity.CreateUTC,
            updatedAt: entity.ModifyUTC,
            password,
        };
    }
};
exports.PrismaUserRepository = PrismaUserRepository;
exports.PrismaUserRepository = PrismaUserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrismaUserRepository);
//# sourceMappingURL=prisma-user.repository.js.map