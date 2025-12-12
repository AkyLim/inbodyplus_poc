import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './domain/user.repository';
import { User } from './domain/user.model';

describe('UsersService', () => {
    let service: UsersService;
    let userRepo: UserRepository;

    const mockUserRepo = {
        findById: jest.fn(),
        findByEmail: jest.fn(),
        create: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                { provide: UserRepository, useValue: mockUserRepo },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepo = module.get<UserRepository>(UserRepository);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('findById', () => {
        it('should return a user if found', async () => {
            const mockUser = { id: '1', email: 'test@example.com' } as User;
            (userRepo.findById as jest.Mock).mockResolvedValue(mockUser);

            const result = await service.findById('1');
            expect(result).toEqual(mockUser);
            expect(userRepo.findById).toHaveBeenCalledWith('1');
        });

        it('should return undefined if not found', async () => {
            (userRepo.findById as jest.Mock).mockResolvedValue(null);

            const result = await service.findById('2');
            expect(result).toBeUndefined();
        });
    });

    describe('findOne', () => {
        it('should return a user if found by email', async () => {
            const mockUser = { id: '1', email: 'test@example.com' } as User;
            (userRepo.findByEmail as jest.Mock).mockResolvedValue(mockUser);

            const result = await service.findOne('test@example.com');
            expect(result).toEqual(mockUser);
            expect(userRepo.findByEmail).toHaveBeenCalledWith('test@example.com');
        });

        it('should return undefined if not found by email', async () => {
            (userRepo.findByEmail as jest.Mock).mockResolvedValue(null);

            const result = await service.findOne('notfound@example.com');
            expect(result).toBeUndefined();
        });
    });
});
