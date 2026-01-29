"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnv = getEnv;
function getEnv(name) {
    const value = process.env[name];
    return value ?? null;
}
