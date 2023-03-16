const splitSimblo = ".";

type JsonValidValue =
  | string
  | number
  | boolean
  | Array<JsonValidValue>
  | { [key: string]: JsonValidValue };
export type JsonType = { [key: string]: JsonValidValue };
const ifJsonObject = (field: JsonValidValue): field is JsonType => {
  return typeof field === "object" && !Array.isArray(field);
};

export const flattenObj = (json: JsonType): JsonType => {
  const result: JsonType = {};
  for (const i in json) {
    if (typeof json[i] === "object" && !Array.isArray(json[i])) {
      const temp = flattenObj(json[i] as { [key: string]: JsonValidValue });
      for (const j in temp) {
        // Store temp in result
        result[i + splitSimblo + j] = temp[j];
      }
    } else {
      result[i] = json[i];
    }
  }
  return result;
};

const getIsLast = (arr: unknown[], currIndex: number): boolean => {
  return arr.length <= currIndex + 1;
};
type AddFieldInObjectArgs = {
  prevObj: JsonType;
  fields: string[];
  value: JsonValidValue;
  currentIndex?: number;
};

export const unflattenObj = (json: JsonType): JsonType => {
  const addFieldInObject = ({
    prevObj,
    fields,
    currentIndex = 0,
    value
  }: AddFieldInObjectArgs): JsonType => {
    if (getIsLast(fields, currentIndex)) {
      prevObj[fields[currentIndex]] = value;
      return prevObj;
    }
    const currentFieldName = fields[currentIndex];
    if (!ifJsonObject(prevObj[currentFieldName])) {
      prevObj[currentFieldName] = {};
    }
    return addFieldInObject({
      prevObj: prevObj[currentFieldName] as JsonType,
      fields: fields,
      currentIndex: currentIndex + 1,
      value: value
    });
  };

  const result: JsonType = {};
  for (const i in json) {
    if (i.includes(splitSimblo)) {
      const fields = i.split(splitSimblo);
      addFieldInObject({
        prevObj: result,
        fields: fields,
        value: json[i]
      });
    } else {
      result[i] = json[i];
    }
  }
  return result;
};
