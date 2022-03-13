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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const invalid_input_exception_1 = __importDefault(require("../../../core/exceptions/invalid-input.exception"));
const error_handler_middleware_1 = __importDefault(require("../../../core/middlewares/error-handler.middleware"));
const repository_factory_1 = require("../../../core/factories/repository.factory");
const already_exists_exception_1 = __importDefault(require("../../../core/exceptions/already-exists.exception"));
function validateUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { password, emailAddress, phoneNumber, firstName, lastName, roleId } = req.body;
        //console.log(req.body);
        if (!password)
            next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("Password was not supplied"), req, res, next));
        if (!emailAddress)
            next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("Email Address was not supplied"), req, res, next));
        if (!phoneNumber)
            next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("Phone Number was not supplied"), req, res, next));
        if (!firstName)
            next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("First Name was not supplied"), req, res, next));
        if (!lastName)
            next(new error_handler_middleware_1.default(new invalid_input_exception_1.default("Last Name was not supplied"), req, res, next));
        // check if user already exist
        // Validate if user exist in our database
        const user = yield getUser(new repository_factory_1.RepositoryFactory(), emailAddress);
        if (user.emailAddress == emailAddress) {
            next(new error_handler_middleware_1.default(new already_exists_exception_1.default(emailAddress), req, res, next));
        }
        else {
            next();
            // res.status(404).send({error: `User ${req.params.userId} not found`});
        }
    });
}
function getUser(factory, emailAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = factory.createUserRepository("Mongo");
        return yield userRepository.getByEmail(emailAddress);
    });
}
exports.default = validateUser;
