import { writeFile } from "./utils/fileUtils";
import { objToCsvString } from "./utils/csvUtils";
import { Translation } from "./Translation/Translation";

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
  const referenceTranslation = new Translation(referenceFileName);
  const comparisonTranslation = new Translation(comparisonFileName);
  const compareResult = referenceTranslation.compare(comparisonTranslation);
  const outerFileCsvString = objToCsvString(compareResult.flatten());
  writeFile(outputFileName, outerFileCsvString);
}
