import csvToJson from "convert-csv-to-json";
import { FlattedTranslationFile } from "../utils/types";

const strCheck = (string: string): boolean => {
  if (typeof string != "string") return false;
  if (!string.trim()) return false;
  return true;
};
interface TranslateRow {
  key: string;
  value: string;
}
const isTranslateRow = (data: unknown): data is TranslateRow => {
  if (!data) return false;
  if (typeof data != "object") return false;
  if (!("key" in data) || typeof data.key != "string") return false;
  if (!("value" in data) || typeof data.value != "string") return false;
  return true;
};
type TranslateCsvFile = TranslateRow[];
const isTranslateCsvFile = (data: unknown): data is TranslateCsvFile => {
  if (!data) return false;
  if (!Array.isArray(data)) return false;
  if (data.length == 0) return true;
  const notValidElement = data.find((item) => !isTranslateRow(item));
  if (notValidElement) return false;
  return true;
};
export const csvToObj = (csvPath: string): FlattedTranslationFile => {
  const array = csvToJson.fieldDelimiter(",").supportQuotedField(true).getJsonFromCsv(csvPath);
  if (!isTranslateCsvFile(array)) throw new Error("Указан не корректный файл");

  const obj: { [key: string]: string } = {};
  array.forEach((item: TranslateRow) => {
    if (typeof item != "object") return;
    if (!strCheck(item.key) || !strCheck(item.value)) return;
    obj[item.key] = item.value;
  });
  return obj;
};

const prepareStringForCsv = (str: string): string => {
  // eslint-disable-next-line @typescript-eslint/quotes
  const removeReservedChar = str.replaceAll('"', '""');
  return `"${removeReservedChar}"`;
};
export const objToCsvString = (obj: FlattedTranslationFile): string => {
  let csvString = "key,value\n";
  if (typeof obj != "object") {
    throw new Error("ошибка превращения файла перевода в плоский JSON");
  }
  if (!Object.keys(obj).length) throw new Error("сплющенный файл перевода пустой");
  for (const key in obj) {
    if (typeof key != "string") throw new Error("ключ перевода не является строкой");
    const value = obj[key];
    if (typeof value != "string") throw new Error("перевод не является строкой");
    csvString += `${prepareStringForCsv(key)},${prepareStringForCsv(value)}\n`;
  }
  return csvString;
};
