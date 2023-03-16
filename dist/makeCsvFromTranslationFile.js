"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeCsvFromTranslationFile = void 0;
const fileUtils_1 = require("./utils/fileUtils");
const objectTransforms_1 = require("./utils/objectTransforms");
const csvUtils_1 = require("./utils/csvUtils");
const guards_1 = require("./utils/guards");
function makeCsvFromTranslationFile(fileInputName, fileOutputName) {
    const data = (0, fileUtils_1.readFile)(fileInputName);
    const json = JSON.parse(data);
    const transformedJson = (0, objectTransforms_1.flattenObj)(json);
    if (!(0, guards_1.checkJsonIsTranslationFile)(transformedJson)) {
        throw new Error("Не валидный JSON");
    }
    const stringifyCsv = (0, csvUtils_1.objToCsvString)(transformedJson);
    (0, fileUtils_1.writeFile)(fileOutputName, stringifyCsv);
}
exports.makeCsvFromTranslationFile = makeCsvFromTranslationFile;
//# sourceMappingURL=makeCsvFromTranslationFile.js.map