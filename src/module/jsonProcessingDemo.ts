import { InvalidArgumentError } from './error/invalidArgumentError';

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

/**
 * This is the old implementation of renameKey(). It uses forEach.
 * @param posts - JSON array of objects
 * @param oldName - each object has a key named oldName
 * @param newName - new key name
 */
export function renameKey1(posts: any[], oldName: string, newName: string): any[] {
    const modified: any[] = [];
    posts.forEach((post: any) => {
        const modifiedPost: any = {};
        Object.keys(post).forEach((key: string) => {
            const value: any = post[key];
            if (key === oldName) {
                key = newName;
            }
            modifiedPost[key] = value;
        });
        modified.push(modifiedPost);
    });
    return modified;
}

/**
 * @param posts - JSON array of objects
 * @param oldName - each object has a key named oldName
 * @param newName - new key name
 */
export const renameKey = (posts: any[], oldName: string, newName: string) =>
    posts.map((post: any) =>
        Object.keys(post).reduce(
            (out, key) => ({
                ...out,
                [key === oldName ? newName : key]: post[key],
            }),
            {},
        ),
    );

function iterateAcrossAny(json: any) {
    console.log('iterateAcrossAny()');

    if (json.length) {
        // Expected a 'for-of' loop instead of a 'for' loop with this simple iteration (prefer-for-of) tslint(1)
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < json.length; ++i) {
            console.log(`item = ${json[i]}`);
        }
    }

    // json: any => Error: TypeError: json.forEach is not a function
    // json.forEach((item: any) => console.log(`item = ${item}`));
    Array.from(json).forEach((item: any) => console.log(`item = ${item}`));

    for (const item in json) {
        // This if is added to prevent the following tslint warning:
        // for (... in ...) statements must be filtered with an if statement (forin)
        if (json.hasOwnProperty(item)) {
            console.log(`item = ${item}`);
        }
    }

    // Error: TypeError: json is not iterable
    // for (const item of json) {
    //     console.log(`item = ${item}`);
    // }

    for (const item of Array.from(json)) {
        console.log(`item = ${item}`);
    }
}

function iterateAcrossAnyArray(json: any[]) {
    console.log('iterateAcrossAnyArray()');

    // Error: TypeError: json.forEach is not a function
    // json.forEach((item: any) => console.log(`item = ${item}`));

    for (const item in json) {
        // This if is added to prevent the following tslint warning:
        // for (... in ...) statements must be filtered with an if statement (forin)
        if (json.hasOwnProperty(item)) {
            console.log(`item = ${item}`);
        }
    }

    // Error: TypeError: json is not iterable
    // for (const item of json) {
    //     console.log(`item = ${item}`);
    // }

    for (const item of Array.from(json)) {
        console.log(`item = ${item}`);
    }
}

function iteratingAcrossJsonDemo() {

    // Array.from() can't transform this to array
    const json1: any = {
        n: 1,
        o: {
            n: 2,
        },
        s: 'test',
    };

    iterateAcrossAny(json1);
    // Output:
    // item = n
    // item = o
    // item = s

    iterateAcrossAnyArray(json1);
    // Output:
    // item = n
    // item = o
    // item = s

    // Array.from() can transform this to array because this is
    // array-like object (object with a length property and indexed elements)
    const json2: any[] = [
        {
            n: 1,
            s: 'test1',
        },
        {
            n: 2,
            s: 'test2',
        },
    ];

    iterateAcrossAny(json2);
    // Output:
    // item = [object Object]
    // item = [object Object]
    // item = [object Object]
    // item = [object Object]
    // item = 0
    // item = 1
    // item = [object Object]
    // item = [object Object]

    iterateAcrossAnyArray(json2);
    // Output:
    // item = 0
    // item = 1
    // item = [object Object]
    // item = [object Object]
}

export function jsonProcessingDemo() {
    iteratingAcrossJsonDemo();
}

/**
 * getKeys returns an union of all keys that appear in JSON array.
 * Example:
 *    json = [ {"a": 1}, {"b": 2} ]
 *    keys = ["a", "b"]
 * @param json JSON array of flat objects (with depth 1).
 */
export function getKeys(obj: any[]): string[] {
    const keys: string[] = [];
    if (obj.length === undefined) {
        throw new InvalidArgumentError('obj', 'Argument is not array-like object');
    }

    for (const item of obj) {
        Object.keys(item).forEach((key) => {
            if (!keys.includes(key)) {
                keys.push(key);
            }
        });
    }

    return keys;
}
