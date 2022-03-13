"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleModel = exports.roleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.roleSchema = new mongoose_1.Schema({
    id: String,
    roleName: String,
});
exports.roleModel = (0, mongoose_1.model)("Role", exports.roleSchema);
