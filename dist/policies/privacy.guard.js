"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redactSecrets = redactSecrets;
function redactSecrets(input) {
    const clone = { ...input };
    for (const key of Object.keys(clone)) {
        if (/token|secret|password|api[_-]?key/i.test(key))
            clone[key] = "[REDACTED]";
    }
    return clone;
}
