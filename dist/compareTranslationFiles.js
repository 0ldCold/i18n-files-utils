"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareTranslationFiles = void 0;
const objectTransforms_1 = require("./utils/objectTransforms");
const fileUtils_1 = require("./utils/fileUtils");
const csvUtils_1 = require("./utils/csvUtils");
const guards_1 = require("./utils/guards");
const readJsonFromPath = (path) => {
    const file = (0, fileUtils_1.readFile)(path);
    return JSON.parse(file);
};
/**
 * Сравнивает 2 файла локализации и создает файл с отсутствующими ключами
 * @param referenceFileName эталонный файл
 * @param comparisonFileName сравниваемый файл
 * @param outputFileName выходной файл с отсутствующими ключами
 */
function compareTranslationFiles(referenceFileName, comparisonFileName, outputFileName) {
    const referenceFileData = readJsonFromPath(referenceFileName);
    const comparisonFileData = readJsonFromPath(comparisonFileName);
    const flattenReferenceFileData = (0, objectTransforms_1.flattenObj)(referenceFileData);
    if (!(0, guards_1.checkJsonIsTranslationFile)(flattenReferenceFileData)) {
        throw new Error("Некорректный эталонный файл");
    }
    const flattenComparisonFileData = (0, objectTransforms_1.flattenObj)(comparisonFileData);
    if (!(0, guards_1.checkJsonIsTranslationFile)(flattenComparisonFileData)) {
        throw new Error("Некорректный сравниваемый файл");
    }
    const flattenReferenceFileDataKeys = Object.keys(flattenReferenceFileData);
    const flattenComparisonFileDataKeys = Object.keys(flattenComparisonFileData);
    const outerFile = {};
    flattenReferenceFileDataKeys.forEach((key) => {
        const isIncludes = flattenComparisonFileDataKeys.includes(key);
        if (isIncludes)
            return;
        const referenceValue = flattenReferenceFileData[key];
        outerFile[key] = referenceValue;
    });
    const outerFileCsvString = (0, csvUtils_1.objToCsvString)(outerFile);
    (0, fileUtils_1.writeFile)(outputFileName, outerFileCsvString);
}
exports.compareTranslationFiles = compareTranslationFiles;
//# sourceMappingURL=compareTranslationFiles.js.map