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
            id: User.id,
            email: User.email,
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
            console.log(error);
            return null;
        }
    }
}
exports.default = JWTServices;
