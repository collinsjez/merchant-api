"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const invalid_token_exception_1 = __importDefault(require("../exceptions/invalid-token.exception"));
/**
 * generates JWT used for local testing
 */
function generateToken(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const privateKey = fs.readFileSync(path.join(__dirname, './../../../private.key'));
            const signInOptions = {
                // RS256 uses a public/private key pair. The API provides the private key
                // to generate the JWT. The client gets a public key to validate the
                // signature
                algorithm: 'RS256',
                expiresIn: '24h'
            };
            console.log(`generated token ${privateKey}`);
            // generate JWT
            const token = (0, jsonwebtoken_1.sign)({ data: payload }, { key: privateKey, passphrase: 'Cr3d1tP@ss' }, signInOptions);
            console.log(`generated token ${token}`);
            return token;
        }
        catch (error) {
            console.log(error);
            return new invalid_token_exception_1.default("Unable to generate token");
        }
    });
}
exports.generateToken = generateToken;
;
/**
 * checks if JWT token is valid
 *
 * @param token the expected token payload
 */
function validateToken(token) {
    return __awaiter(this, void 0, void 0, function* () {
        const publicKey = fs.readFileSync(path.join(__dirname, './../../../public.key'));
        const verifyOptions = {
            algorithms: ['RS256', 'RS512'],
        };
        return (0, jsonwebtoken_1.verify)(token, publicKey, verifyOptions);
        ;
    });
}
exports.validateToken = validateToken;
