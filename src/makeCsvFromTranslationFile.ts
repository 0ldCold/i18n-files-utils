import { writeFile } from "./utils/fileUtils";
import { objToCsvString } from "./utils/csvUtils";
import { Translation } from "./Translation/Translation";

export function makeCsvFromTranslationFile(fileInputName: string, fileOutputName: string): void {
  const translation = new Translation(fileOutputName);
  const stringifyCsv = objToCsvString(translation.flatten());
  writeFile(fileOutputName, stringifyCsv);
}
