"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URL = void 0;
exports.MONGODB_URL = process.env["MONGODB_URI"];
if (!exports.MONGODB_URL) {
    console.log("No mongo connection string. Set MONGODB_URI environment variable.");
    process.exit(1);
}
exports.JWT_SECRET = process.env["JWT_SECRET"];
if (!exports.JWT_SECRET) {
    console.log("No JWT secret string. Set JWT_SECRET environment variable.");
    process.exit(1);
}
