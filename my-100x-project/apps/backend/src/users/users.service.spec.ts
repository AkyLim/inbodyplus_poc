import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './domain/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;
    let userRepo: UserRepository;

    const mockUserRepo = {
        findById: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: UserRepository, useValue: mockUserRepo },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepo = module.get<UserRepository>(UserRepository); // Inject Interface Token
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findOne', () => {
        it('should return a user if found', async () => {
            const mockUser = { id: 'uuid-1', email: 'test@example.com', name: 'Test', role: 'USER', createdAt: new Date(), updatedAt: new Date() };
            (userRepo.findById as jest.Mock).mockResolvedValue(mockUser);

            const result = await service.findOne('uuid-1');
            expect(result).toEqual(mockUser);
            expect(userRepo.findById).toHaveBeenCalledWith('uuid-1');
        });

        it('should throw NotFoundException if not found', async () => {
            (userRepo.findById as jest.Mock).mockResolvedValue(null);
            await expect(service.findOne('uuid-2')).rejects.toThrow(NotFoundException);
        });
    });
});
