import { flattenObj } from "./utils/objectTransforms";
import { readFile, writeFile } from "./utils/fileUtils";
import { objToCsvString } from "./utils/csvUtils";
import { FlattedTranslationFile } from "./utils/types";
import { checkJsonIsTranslationFile } from "./utils/guards";

const readJsonFromPath = (path: string) => {
  const file = readFile(path);
  return JSON.parse(file);
};

/**
 * Сравнивает 2 файла локализации и создает файл с отсутствующими ключами
 * @param referenceFileName эталонный файл
 * @param comparisonFileName сравниваемый файл
 * @param outputFileName выходной файл с отсутствующими ключами
 */
export function compareTranslationFiles(
  referenceFileName: string,
  comparisonFileName: string,
  outputFileName: string
): void {
  const referenceFileData = readJsonFromPath(referenceFileName);
  const comparisonFileData = readJsonFromPath(comparisonFileName);
  const flattenReferenceFileData = flattenObj(referenceFileData);
  if (!checkJsonIsTranslationFile(flattenReferenceFileData)) {
    throw new Error("Некорректный эталонный файл");
  }
  const flattenComparisonFileData = flattenObj(comparisonFileData);
  if (!checkJsonIsTranslationFile(flattenComparisonFileData)) {
    throw new Error("Некорректный сравниваемый файл");
  }
  const flattenReferenceFileDataKeys = Object.keys(flattenReferenceFileData);
  const flattenComparisonFileDataKeys = Object.keys(flattenComparisonFileData);

  const outerFile: FlattedTranslationFile = {};

  flattenReferenceFileDataKeys.forEach((key) => {
    const isIncludes = flattenComparisonFileDataKeys.includes(key);
    if (isIncludes) return;
    const referenceValue = flattenReferenceFileData[key];
    outerFile[key] = referenceValue;
  });
  const outerFileCsvString = objToCsvString(outerFile);
  writeFile(outputFileName, outerFileCsvString);
}
