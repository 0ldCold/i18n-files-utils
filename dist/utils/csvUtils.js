"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objToCsvString = exports.csvToObj = void 0;
const convert_csv_to_json_1 = __importDefault(require("convert-csv-to-json"));
const strCheck = (string) => {
    if (typeof string != "string")
        return false;
    if (!string.trim())
        return false;
    return true;
};
const isTranslateRow = (data) => {
    if (!data)
        return false;
    if (typeof data != "object")
        return false;
    if (!("key" in data) || typeof data.key != "string")
        return false;
    if (!("value" in data) || typeof data.value != "string")
        return false;
    return true;
};
const isTranslateCsvFile = (data) => {
    if (!data)
        return false;
    if (!Array.isArray(data))
        return false;
    if (data.length == 0)
        return true;
    const notValidElement = data.find((item) => !isTranslateRow(item));
    if (notValidElement)
        return false;
    return true;
};
const csvToObj = (csvPath) => {
    const array = convert_csv_to_json_1.default.fieldDelimiter(",").supportQuotedField(true).getJsonFromCsv(csvPath);
    if (!isTranslateCsvFile(array))
        throw new Error("Указан не корректный файл");
    const obj = {};
    array.forEach((item) => {
        if (typeof item != "object")
            return;
        if (!strCheck(item.key) || !strCheck(item.value))
            return;
        obj[item.key] = item.value;
    });
    return obj;
};
exports.csvToObj = csvToObj;
const prepareStringForCsv = (str) => {
    // eslint-disable-next-line @typescript-eslint/quotes
    const removeReservedChar = str.replaceAll('"', '""');
    return `"${removeReservedChar}"`;
};
const objToCsvString = (obj) => {
    let csvString = "key,value\n";
    if (typeof obj != "object") {
        throw new Error("ошибка превращения файла перевода в плоский JSON");
    }
    if (!Object.keys(obj).length)
        throw new Error("сплющенный файл перевода пустой");
    for (const key in obj) {
        if (typeof key != "string")
            throw new Error("ключ перевода не является строкой");
        const value = obj[key];
        if (typeof value != "string")
            throw new Error("перевод не является строкой");
        csvString += `${prepareStringForCsv(key)},${prepareStringForCsv(value)}\n`;
    }
    return csvString;
};
exports.objToCsvString = objToCsvString;
//# sourceMappingURL=csvUtils.js.map