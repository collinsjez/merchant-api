"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepositoryFactory = void 0;
const user_repository_1 = __importDefault(require("../../memory/user.repository"));
const users_repository_1 = __importDefault(require("./users.repository"));
class RepositoryFactory {
    createUserRepositoryMongo() {
        return new users_repository_1.default();
    }
    createUserRepositoryMemory() {
        return new user_repository_1.default();
    }
    createUserRepository(type = "Mongo") {
        switch (type) {
            case "Mongo":
                return this.createUserRepositoryMongo();
            case "Memory":
                return this.createUserRepositoryMemory();
        }
    }
}
exports.RepositoryFactory = RepositoryFactory;
