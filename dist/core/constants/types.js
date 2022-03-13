"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TYPES = {
    IUserRepository: Symbol.for('IUserRepository'),
    IUserRepositoryMemory: Symbol.for('IUserRepositoryMemory'),
    IMerchantRepository: Symbol.for('IMerchantRepository'),
    IUserService: Symbol.for('IUserService'),
    IMerchantService: Symbol.for('IMerchantService'),
    IAddUserCommand: Symbol.for('IAddUserCommand'),
    IUpdateUserCommand: Symbol.for('IUpdateUserCommand'),
    IListUsersCommand: Symbol.for('IListUsersCommand'),
    IGetUserCommand: Symbol.for('IGetUserCommand'),
    IGetAuthTokenCommand: Symbol.for('IGetAuthTokenCommand'),
    IUsersMiddleware: Symbol.for('IUsersMiddleware'),
    IAuthService: Symbol.for('IAuthService')
};
exports.default = TYPES;
