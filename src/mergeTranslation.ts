import { Translation } from "./Translation/Translation";
import { writeFile } from "./utils/fileUtils";

export function mergeTranslation(
  defaultFileName: string,
  mergedFileName: string,
  outputFileName: string
) {
  const defaultTranslation = new Translation(defaultFileName);
  const mergedTranslation = new Translation(mergedFileName);

  const result = defaultTranslation.merge(mergedTranslation);
  const stringifyJsonResult = JSON.stringify(result.unflatten());
  writeFile(outputFileName, stringifyJsonResult);
}
