"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisConfig = getRedisConfig;
function getRedisConfig() {
    const url = process.env.REDIS_URL;
    if (!url)
        throw new Error("REDIS_URL is required");
    return { url };
}
