import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
    let controller: UsersController;
    let service: UsersService;

    const mockUsersService = {
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                { provide: UsersService, useValue: mockUsersService },
            ],
        }).compile();

        controller = module.get<UsersController>(UsersController);
        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('findOne', () => {
        it('should return a user', async () => {
            const mockUser = { id: 'uuid-1', email: 'test@example.com', role: 'USER' };
            (service.findOne as jest.Mock).mockResolvedValue(mockUser);

            const result = await controller.findOne('uuid-1');
            expect(result).toEqual(mockUser);
            expect(service.findOne).toHaveBeenCalledWith('uuid-1');
        });
    });
});
