"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.respond = respond;
const summarizer_1 = require("../memory/summarizer");
async function respond(input) {
    const summary = (0, summarizer_1.summarizeText)(input.text);
    return { reply: summary };
}
