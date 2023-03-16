import mri from "mri";
import { makeCsvFromTranslationFile } from "./makeCsvFromTranslationFile";
import { makeTranslationFileFromCsv } from "./makeTranslationFileFromCsv";
import { compareTranslationFiles } from "./compareTranslationFiles";

enum UtilsType {
  makeCsv = "makeCsv",
  makeI18n = "makeI18n",
  compare = "compare"
}
const types = Object.values(UtilsType).join("/");
const isUtilsType = (str: string): str is UtilsType => {
  return Object.values(UtilsType).includes(str as UtilsType);
};
interface Arguments {
  type?: string;
  input?: string;
  output?: string;
  reference?: string;
}

export const run = (): void => {
  const argv = process.argv.slice(2);
  const Args = mri<Arguments>(argv);
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
      makeCsvFromTranslationFile(Args.input, Args.output);
      return;
    }
    case UtilsType.makeI18n: {
      if (!Args.input || typeof Args.input != "string") {
        throw new Error("Не указал путь до CSV файла (--input=path)");
      }
      if (!Args.output || typeof Args.output != "string") {
        throw new Error("Не указал путь до итогового файла локализации (--output=path)");
      }
      makeTranslationFileFromCsv(Args.input, Args.output);
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
      compareTranslationFiles(Args.reference, Args.input, Args.output);
      return;
    }
    default: {
      throw new Error("Функционал отсутствует");
    }
  }
};
