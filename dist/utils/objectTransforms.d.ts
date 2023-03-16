type JsonValidValue = string | number | boolean | Array<JsonValidValue> | {
    [key: string]: JsonValidValue;
};
export type JsonType = {
    [key: string]: JsonValidValue;
};
export declare const flattenObj: (json: JsonType) => JsonType;
export declare const unflattenObj: (json: JsonType) => JsonType;
export {};
