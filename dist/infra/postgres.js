"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostgresConfig = getPostgresConfig;
function getPostgresConfig() {
    const url = process.env.POSTGRES_URL;
    if (!url)
        throw new Error("POSTGRES_URL is required");
    return { url };
}
