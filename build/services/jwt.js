"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.JWT_SECRET;
class JWTServices {
    static genrateTokenForUser(User) {
        const payload = {
            id: User === null || User === void 0 ? void 0 : User.id,
            email: User === null || User === void 0 ? void 0 : User.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, jwtSecret);
        return token;
    }
    static decodeToken(token) {
        try {
            const payload = jsonwebtoken_1.default.verify(token, jwtSecret);
            return payload;
        }
        catch (error) {
            console.log('error in decode', error);
            return null;
        }
    }
}
exports.default = JWTServices;
