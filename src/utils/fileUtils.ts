import fs from "fs";

export const readFile = (path: string) => {
  try {
    return fs.readFileSync(path, "utf8");
  } catch (_) {
    throw new Error("Файл не найден");
  }
};
export const writeFile = (path: string, data: string) => {
  try {
    return fs.writeFileSync(path, data);
  } catch (_) {
    throw new Error("Не удалось записать файл");
  }
};
