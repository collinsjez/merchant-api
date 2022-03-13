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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortid_1 = __importDefault(require("shortid"));
const debug_1 = __importDefault(require("debug"));
const inversify_1 = require("inversify");
const log = (0, debug_1.default)('app:in-memory-dao');
let UsersRepository = class UsersRepository {
    constructor() {
        this.users = [];
        log('Created new instance of UsersDao');
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    ;
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    ;
    create(userDTO) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                userId: shortid_1.default.generate(),
                emailAddress: userDTO.email,
                password: userDTO.password,
                phoneNumber: userDTO.phone,
                firstName: userDTO.firstName,
                lastName: userDTO.lastName,
                role: { roleId: userDTO.permissionLevel }
            };
            this.users.push(user);
            return user.userId;
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users;
        });
    }
    readById(userId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.users.find((user) => user.userId === userId);
        });
    }
    putById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.userId === user.userId);
            this.users.splice(objIndex, 1, user);
            return `${user.userId} updated via put`;
        });
    }
    patchById(userId, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.userId === user.userId);
            let currentUser = this.users[objIndex];
            const allowedPatchFields = ["password", "firstName", "lastName", "permissionLevel"];
            for (let field of allowedPatchFields) {
                if (field in user) {
                    // @ts-ignore
                    currentUser[field] = user[field];
                }
            }
            this.users.splice(objIndex, 1, currentUser);
            return `${user.userId} patched`;
        });
    }
    deleteById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.userId === userId);
            this.users.splice(objIndex, 1);
            return `${userId} removed`;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.users.findIndex((obj) => obj.emailAddress === email);
            let currentUser = this.users[objIndex];
            if (currentUser) {
                return currentUser;
            }
            else {
                return null;
            }
        });
    }
};
UsersRepository = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], UsersRepository);
exports.default = UsersRepository;
