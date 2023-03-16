import { csvToObj } from "./utils/csvUtils";
import { unflattenObj } from "./utils/objectTransforms";
import { writeFile } from "./utils/fileUtils";

export function makeTranslationFileFromCsv(fileInputName: string, fileOutputName: string): void {
  const json = csvToObj(fileInputName);
  const transformedJson = unflattenObj(json);

  writeFile(fileOutputName, JSON.stringify(transformedJson));
}
