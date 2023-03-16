"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFile = exports.readFile = void 0;
const fs_1 = __importDefault(require("fs"));
const readFile = (path) => {
    return fs_1.default.readFileSync(path, "utf8");
};
exports.readFile = readFile;
const writeFile = (path, data) => {
    return fs_1.default.writeFileSync(path, data);
};
exports.writeFile = writeFile;
//# sourceMappingURL=fileUtils.js.map