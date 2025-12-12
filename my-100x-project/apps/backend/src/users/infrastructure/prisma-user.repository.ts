import { Injectable } from '@nestjs/common';
import { UserRepository } from '../domain/user.repository';
import { User } from '../domain/user.model';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findById(id: string): Promise<User | null> {
        try {
            const uid = BigInt(id);
            const entity = await this.prisma.profile_UserInfo.findUnique({
                where: { UID: uid },
            });
            return entity ? this.toDomain(entity) : null;
        } catch (error) {
            // BigInt 변환 에러 등 처리
            console.error('Error in findById:', error);
            return null;
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.prisma.profile_UserInfo.findFirst({
            where: { Email: email },
        });
        return entity ? this.toDomain(entity) : null;
    }

    async findAll(): Promise<User[]> {
        const entities = await this.prisma.profile_UserInfo.findMany({
            take: 20, // 안전을 위해 20개만 조회
        });
        return entities.map((e) => this.toDomain(e));
    }

    async create(entity: Partial<User>): Promise<User> {
        // NOTE: Profile_UserInfo 테이블은 LoginID, Password 등 필수 필드가 많아
        // Partial<User> 만으로는 생성이 불가능할 수 있습니다.
        // 현재는 읽기 전용 ORM 구현에 집중하고, 쓰기 로직은 추후 별도 구현해야 합니다.
        throw new Error('Create method not fully implemented for legacy schema');
    }

    async update(id: string, entity: Partial<User>): Promise<User> {
        const uid = BigInt(id);
        const updateData: any = {};
        if (entity.name) updateData.Name = entity.name;
        // 필요한 필드 매핑 추가

        const updated = await this.prisma.profile_UserInfo.update({
            where: { UID: uid },
            data: updateData,
        });
        return this.toDomain(updated);
    }

    async delete(id: string): Promise<void> {
        const uid = BigInt(id);
        await this.prisma.profile_UserInfo.delete({
            where: { UID: uid },
        });
    }

    private toDomain(entity: any): User {
        let password = undefined;
        if (entity.LoginPW) {
            // Buffer인 경우 문자열로 변환. 인코딩은 DB 저장 방식에 따라 다를 수 있음.
            // 일단 'utf-8'로 시도하거나 그대로 toString()
            password = Buffer.isBuffer(entity.LoginPW)
                ? entity.LoginPW.toString()
                : String(entity.LoginPW);
        }

        return {
            id: entity.UID.toString(),
            email: entity.Email,
            name: entity.Name,
            role: 'USER', // DB에 Role 컬럼이 없으므로 기본값
            createdAt: entity.CreateUTC,
            updatedAt: entity.ModifyUTC,
            password,
        };
    }
}
