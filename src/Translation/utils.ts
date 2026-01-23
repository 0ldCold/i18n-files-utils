import { readFile } from "../utils/fileUtils";
import { flattenObj, JsonType } from "../utils/objectTransforms";
import { FlattedTranslationFile } from "../utils/types";
import { checkJsonIsTranslationFile } from "../utils/guards";
import { csvToObj } from "../utils/csvUtils";

export const checkIsJson = (filePath: string): boolean => {
  const file = readFile(filePath);
  try {
    JSON.parse(file);
    return true;
  } catch (e) {
    return false;
  }
};
export const JsonToTranslation = (path: string): FlattedTranslationFile => {
  let file: string;
  try {
    file = readFile(path);
  } catch (_) {
    throw new Error("Файл не найден");
  }
  const json: JsonType = JSON.parse(file);
  const translation = flattenObj(json);
  if (!checkJsonIsTranslationFile(translation)) throw new Error("Не корректный JSON");
  return translation;
};
export const CsvToTranslation = (path: string): FlattedTranslationFile => {
  return csvToObj(path);
};
export const compareTranslation = (
  referenceTranslation: FlattedTranslationFile,
  comparisonTranslation: FlattedTranslationFile
): FlattedTranslationFile => {
  const referenceTranslationKeys = Object.keys(referenceTranslation);
  const comparisonTranslationKeys = Object.keys(comparisonTranslation);

  const outerFile: FlattedTranslationFile = {};

  referenceTranslationKeys.forEach((key) => {
    const isIncludes = comparisonTranslationKeys.includes(key);
    if (isIncludes) return;
    outerFile[key] = referenceTranslation[key];
  });
  return outerFile;
};
export const mergeTranslation = (
  defaultTranslation: FlattedTranslationFile,
  mergedTranslation: FlattedTranslationFile
): FlattedTranslationFile => {
  const result: FlattedTranslationFile = { ...defaultTranslation, ...mergedTranslation };

  return result;
};
