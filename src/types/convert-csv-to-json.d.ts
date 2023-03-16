declare module "convert-csv-to-json" {
  class Converter {
    constructor();
    static fieldDelimiter(string: string): Converter;
    supportQuotedField(boolean: boolean): Converter;
    getJsonFromCsv(path: string): { [key: string]: string }[];
  }
  export default Converter;
}
