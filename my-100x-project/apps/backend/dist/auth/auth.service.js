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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(createUserDto) {
        const existing = await this.usersService.findOne(createUserDto.email);
        if (existing) {
            throw new Error('User already exists');
        }
        return this.usersService.create(createUserDto);
    }
    async validateUser(email, pass) {
        const user = await this.usersService.findOne(email);
        if (user && user.password === pass) {
            return user;
        }
        return null;
    }
    async login(user) {
        var _a;
        const payload = { username: user.email, sub: user.id };
        const accessToken = Buffer.from(JSON.stringify(payload)).toString('base64');
        return {
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                nickname: (_a = user.name) !== null && _a !== void 0 ? _a : '',
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], AuthService);
//# sourceMappingURL=auth.service.js.map