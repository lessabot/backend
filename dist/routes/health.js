"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
async function default_1(app) {
    app.get("/", async () => ({ status: "ok" }));
}
