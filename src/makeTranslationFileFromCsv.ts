import { writeFile } from "./utils/fileUtils";
import { Translation } from "./Translation/Translation";

export function makeTranslationFileFromCsv(fileInputName: string, fileOutputName: string): void {
  const translation = new Translation(fileInputName);
  const stringifyTranslationJson = JSON.stringify(translation.unflatten());
  writeFile(fileOutputName, stringifyTranslationJson);
}
