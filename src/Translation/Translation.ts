import { FlattedTranslationFile } from "../utils/types";
import { checkIsJson, compareTranslation, CsvToTranslation, JsonToTranslation } from "./utils";
import { unflattenObj } from "../utils/objectTransforms";

export class Translation {
  private readonly value: FlattedTranslationFile;
  constructor(pathToFile: string | FlattedTranslationFile) {
    if (typeof pathToFile != "string") {
      this.value = pathToFile;
      return;
    }
    if (checkIsJson(pathToFile)) {
      this.value = JsonToTranslation(pathToFile);
      return;
    }
    this.value = CsvToTranslation(pathToFile);
    return;
  }
  flatten() {
    return this.value;
  }
  unflatten() {
    return unflattenObj(this.value);
  }
  compare(comparable: Translation): Translation {
    return new Translation(compareTranslation(this.value, comparable.flatten()));
  }
}
