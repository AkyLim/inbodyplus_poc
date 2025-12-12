"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthResponseDto = exports.LoginDto = void 0;
const zod_1 = require("zod");
exports.LoginDto = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.AuthResponseDto = zod_1.z.object({
    accessToken: zod_1.z.string(),
    user: zod_1.z.object({
        id: zod_1.z.string(),
        email: zod_1.z.string(),
        nickname: zod_1.z.string(),
    }),
});
//# sourceMappingURL=auth.js.map