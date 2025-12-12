"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const users_controller_1 = require("./users.controller");
const users_service_1 = require("./users.service");
describe('UsersController', () => {
    let controller;
    let service;
    const mockUsersService = {
        findOne: jest.fn(),
    };
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [users_controller_1.UsersController],
            providers: [
                { provide: users_service_1.UsersService, useValue: mockUsersService },
            ],
        }).compile();
        controller = module.get(users_controller_1.UsersController);
        service = module.get(users_service_1.UsersService);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
    describe('findOne', () => {
        it('should return a user', async () => {
            const mockUser = { id: 'uuid-1', email: 'test@example.com', role: 'USER' };
            service.findOne.mockResolvedValue(mockUser);
            const result = await controller.findOne('uuid-1');
            expect(result).toEqual(mockUser);
            expect(service.findOne).toHaveBeenCalledWith('uuid-1');
        });
    });
});
//# sourceMappingURL=users.controller.spec.js.map