import { readFile, writeFile } from "./utils/fileUtils";
import { flattenObj } from "./utils/objectTransforms";
import { objToCsvString } from "./utils/csvUtils";
import { checkJsonIsTranslationFile } from "./utils/guards";

export function makeCsvFromTranslationFile(fileInputName: string, fileOutputName: string): void {
  const data = readFile(fileInputName);
  const json = JSON.parse(data);
  const transformedJson = flattenObj(json);
  if (!checkJsonIsTranslationFile(transformedJson)) {
    throw new Error("Не валидный JSON");
  }
  const stringifyCsv = objToCsvString(transformedJson);
  writeFile(fileOutputName, stringifyCsv);
}
