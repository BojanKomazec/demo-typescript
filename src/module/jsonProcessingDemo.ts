/**
 * Creates and returns a shallow copy of the input JSON object.
 * @param json Input json
 */
export function shallowCopy(json: any): any {
    const copy: any = {};
    for (const key of Object.keys(json)) {
        copy[key] = json[key];
    }
    return copy;
}

/**
 * Function which iterates through root level properties and checks if their
 * value is of JSON array type. If it is, converts this JSON array object into
 * a string made by joining stringified elements of the original array and using
 * delimiter as a separator.
 * @todo check if hasOwnProperty is necessary after Object.keys
 * @param json
 * @param delimiter
 */
export function transformArrayToString(json: any, delimiter: string): any {
    const newJson: any = shallowCopy(json);

    Object.keys(newJson).forEach((key) => {
        if (newJson.hasOwnProperty(key)) {
            if (Array.isArray(newJson[key])) {
                newJson[key] = newJson[key].join(delimiter);
            }
        }
    });

    return newJson;
}
