import { JsonType } from "../utils/objectTransforms";
import { FlattedTranslationFile } from "../utils/types";
export declare const checkJsonIsTranslationFile: (json: JsonType) => json is FlattedTranslationFile;
