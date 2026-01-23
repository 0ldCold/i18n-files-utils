import { JsonType } from "../utils/objectTransforms";
import { FlattedTranslationFile } from "../utils/types";

export const checkJsonIsTranslationFile = (json: JsonType): json is FlattedTranslationFile => {
  for (const jsonKey in json) {
    const value = json[jsonKey];
    if (typeof value != "string") return false;
  }
  return true;
};
