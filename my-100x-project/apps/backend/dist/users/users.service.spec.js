"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_service_1 = require("./users.service");
const user_repository_1 = require("./domain/user.repository");
const common_1 = require("@nestjs/common");
describe('UsersService', () => {
    let service;
    let userRepo;
    const mockUserRepo = {
        findById: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [
                users_service_1.UsersService,
                { provide: user_repository_1.UserRepository, useValue: mockUserRepo },
            ],
        }).compile();
        service = module.get(users_service_1.UsersService);
        userRepo = module.get(user_repository_1.UserRepository);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    describe('findOne', () => {
        it('should return a user if found', async () => {
            const mockUser = { id: 'uuid-1', email: 'test@example.com', name: 'Test', role: 'USER', createdAt: new Date(), updatedAt: new Date() };
            userRepo.findById.mockResolvedValue(mockUser);
            const result = await service.findOne('uuid-1');
            expect(result).toEqual(mockUser);
            expect(userRepo.findById).toHaveBeenCalledWith('uuid-1');
        });
        it('should throw NotFoundException if not found', async () => {
            userRepo.findById.mockResolvedValue(null);
            await expect(service.findOne('uuid-2')).rejects.toThrow(common_1.NotFoundException);
        });
    });
});
//# sourceMappingURL=users.service.spec.js.map