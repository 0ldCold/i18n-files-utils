"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const mri_1 = __importDefault(require("mri"));
const makeCsvFromTranslationFile_1 = require("./makeCsvFromTranslationFile");
const makeTranslationFileFromCsv_1 = require("./makeTranslationFileFromCsv");
const compareTranslationFiles_1 = require("./compareTranslationFiles");
var UtilsType;
(function (UtilsType) {
    UtilsType["makeCsv"] = "makeCsv";
    UtilsType["makeI18n"] = "makeI18n";
    UtilsType["compare"] = "compare";
})(UtilsType || (UtilsType = {}));
const types = Object.values(UtilsType).join("/");
const isUtilsType = (str) => {
    return Object.values(UtilsType).includes(str);
};
const run = () => {
    const argv = process.argv.slice(2);
    const Args = (0, mri_1.default)(argv);
    const utilsType = Args.type;
    if (!utilsType) {
        throw new Error(`Укажите утилиту, которую вы ходите запустить (--type=${types})`);
    }
    if (!isUtilsType(utilsType)) {
        throw new Error(`Указанной утилиты не существует (--type=${types})`);
    }
    switch (utilsType) {
        case UtilsType.makeCsv: {
            if (!Args.input || typeof Args.input != "string") {
                throw new Error("Не указал путь до файла локализации (--input=path)");
            }
            if (!Args.output || typeof Args.output != "string") {
                throw new Error("Не указал путь до итогового файла CSV (--output=path)");
            }
            (0, makeCsvFromTranslationFile_1.makeCsvFromTranslationFile)(Args.input, Args.output);
            return;
        }
        case UtilsType.makeI18n: {
            if (!Args.input || typeof Args.input != "string") {
                throw new Error("Не указал путь до CSV файла (--input=path)");
            }
            if (!Args.output || typeof Args.output != "string") {
                throw new Error("Не указал путь до итогового файла локализации (--output=path)");
            }
            (0, makeTranslationFileFromCsv_1.makeTranslationFileFromCsv)(Args.input, Args.output);
            return;
        }
        case UtilsType.compare: {
            if (!Args.input || typeof Args.input != "string") {
                throw new Error("Не указал путь до сравниваемого файла (--input=path)");
            }
            if (!Args.reference || typeof Args.reference != "string") {
                throw new Error("Не указал путь до эталонного файла (--reference=path)");
            }
            if (!Args.output || typeof Args.output != "string") {
                throw new Error("Не указал путь до итогового файла (--output=path)");
            }
            (0, compareTranslationFiles_1.compareTranslationFiles)(Args.reference, Args.input, Args.output);
            return;
        }
        default: {
            throw new Error("Функционал отсутствует");
        }
    }
};
exports.run = run;
//# sourceMappingURL=runFile.js.map