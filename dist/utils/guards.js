"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJsonIsTranslationFile = void 0;
const checkJsonIsTranslationFile = (json) => {
    for (const jsonKey in json) {
        const value = json[jsonKey];
        if (typeof value != "string")
            return false;
    }
    return true;
};
exports.checkJsonIsTranslationFile = checkJsonIsTranslationFile;
//# sourceMappingURL=guards.js.map