"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unflattenObj = exports.flattenObj = void 0;
const splitSimblo = ".";
const ifJsonObject = (field) => {
    return typeof field === "object" && !Array.isArray(field);
};
const flattenObj = (json) => {
    const result = {};
    for (const i in json) {
        if (typeof json[i] === "object" && !Array.isArray(json[i])) {
            const temp = (0, exports.flattenObj)(json[i]);
            for (const j in temp) {
                // Store temp in result
                result[i + splitSimblo + j] = temp[j];
            }
        }
        else {
            result[i] = json[i];
        }
    }
    return result;
};
exports.flattenObj = flattenObj;
const getIsLast = (arr, currIndex) => {
    return arr.length <= currIndex + 1;
};
const unflattenObj = (json) => {
    const addFieldInObject = ({ prevObj, fields, currentIndex = 0, value }) => {
        if (getIsLast(fields, currentIndex)) {
            prevObj[fields[currentIndex]] = value;
            return prevObj;
        }
        const currentFieldName = fields[currentIndex];
        if (!ifJsonObject(prevObj[currentFieldName])) {
            prevObj[currentFieldName] = {};
        }
        return addFieldInObject({
            prevObj: prevObj[currentFieldName],
            fields: fields,
            currentIndex: currentIndex + 1,
            value: value
        });
    };
    const result = {};
    for (const i in json) {
        if (i.includes(splitSimblo)) {
            const fields = i.split(splitSimblo);
            addFieldInObject({
                prevObj: result,
                fields: fields,
                value: json[i]
            });
        }
        else {
            result[i] = json[i];
        }
    }
    return result;
};
exports.unflattenObj = unflattenObj;
//# sourceMappingURL=objectTransforms.js.map