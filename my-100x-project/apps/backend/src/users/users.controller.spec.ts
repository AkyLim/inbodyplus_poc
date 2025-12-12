import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './domain/user.model';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        findById: jest.fn(),
                    },
                },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getByUid', () => {
        it('should return user info without password', async () => {
            const mockUser: User = {
                id: '123456',
                loginId: 'testuser',
                email: 'test@example.com',
                countryCode: 'KR',
                profileType: 'MAIN',
                gender: 'M',
                birthDay: new Date('1990-01-01'),
                height: 180,
                createAccountDate: new Date(),
                role: 'USER',
                createdAt: new Date(),
                updatedAt: new Date(),
                password: 'supersecretpassword',
            };

            jest.spyOn(service, 'findById').mockResolvedValue(mockUser);

            const result = await controller.getByUid('123456');

            expect(result).toBeDefined();
            expect(result).toHaveProperty('id', '123456');
            // expect(result).not.toHaveProperty('password'); 
            expect(result.password).toBeUndefined();
            expect(service.findById).toHaveBeenCalledWith('123456');
        });

        it('should return null if user not found', async () => {
            jest.spyOn(service, 'findById').mockResolvedValue(null);

            const result = await controller.getByUid('999999');

            expect(result).toBeNull();
            expect(service.findById).toHaveBeenCalledWith('999999');
        });
    });
});
