"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const client_1 = require("@prisma/client");
exports.mutation = {
    createTweet: (parent_1, _a, ctx_1) => __awaiter(void 0, [parent_1, _a, ctx_1], void 0, function* (parent, { payload }, ctx) {
        if (!ctx.user) {
            throw new Error(`You are not Authenticated`);
        }
        yield client_1.PrismaClient.tweet.create({
            data: {
                content: payload === null || payload === void 0 ? void 0 : payload.content,
                imageUrl: payload === null || payload === void 0 ? void 0 : payload.imageUrl,
                author: { connect: { id: ctx.user.id } },
            }
        });
    })
};
