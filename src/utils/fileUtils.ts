import fs from "fs";

export const readFile = (path: string) => {
  return fs.readFileSync(path, "utf8");
};
export const writeFile = (path: string, data: string) => {
  return fs.writeFileSync(path, data);
};
