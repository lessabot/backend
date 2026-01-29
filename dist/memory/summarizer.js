"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizeText = summarizeText;
function summarizeText(text) {
    const trimmed = text.trim();
    if (!trimmed)
        return "";
    return trimmed.length <= 160 ? trimmed : `${trimmed.slice(0, 157)}...`;
}
