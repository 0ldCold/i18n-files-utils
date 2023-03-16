"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeTranslationFileFromCsv = void 0;
const csvUtils_1 = require("./utils/csvUtils");
const objectTransforms_1 = require("./utils/objectTransforms");
const fileUtils_1 = require("./utils/fileUtils");
function makeTranslationFileFromCsv(fileInputName, fileOutputName) {
    const json = (0, csvUtils_1.csvToObj)(fileInputName);
    const transformedJson = (0, objectTransforms_1.unflattenObj)(json);
    (0, fileUtils_1.writeFile)(fileOutputName, JSON.stringify(transformedJson));
}
exports.makeTranslationFileFromCsv = makeTranslationFileFromCsv;
//# sourceMappingURL=makeTranslationFileFromCsv.js.map