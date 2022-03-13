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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const express_1 = __importDefault(require("express"));
const constants_1 = __importDefault(require("../../../core/utils/constants"));
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const types_1 = __importDefault(require("../../../core/constants/types"));
let MerchantsController = 
//@injectable()
class MerchantsController {
    constructor(merchantService) {
        this.merchantService = merchantService;
        this.path = constants_1.default.BASE_ROUTE_PATH + constants_1.default.ROUTE_PATH_MERCHANTS;
        //super();
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.get(this.path, this.listMerchants);
        // console.log('initialized '+ this.path);
    }
    listMerchants(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const merchants = yield this.merchantService.list(100, 0);
            response.status(200).send(merchants);
        });
    }
};
__decorate([
    (0, inversify_express_utils_1.httpGet)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MerchantsController.prototype, "listMerchants", null);
MerchantsController = __decorate([
    (0, inversify_express_utils_1.controller)('/merchants')
    //@injectable()
    ,
    __param(0, (0, inversify_1.inject)(types_1.default.IMerchantService)),
    __metadata("design:paramtypes", [Object])
], MerchantsController);
exports.default = MerchantsController;
