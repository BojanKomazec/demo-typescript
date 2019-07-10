import { transformArrayToString } from '../src/module/jsonProcessingDemo';

test('Dummy test', () => {
    expect(1).toBe(1);
});

// describe("flattenBranches", () => {
//     const testInputOutput: Array<[any, any]> = [
//         [
//             {},
//             {},
//         ],
//         [
//             {
//                 a: 1,
//             },
//             {
//                 a: 1,
//             },
//         ],
//         [
//             {
//                 a: 1,
//                 b: 2,
//             },
//             {
//                 a: 1,
//                 b: 2,
//             },
//         ],
//         [
//             {
//                 a: {
//                     b: 12,
//                 },
//             },
//             {
//                 a: {
//                     b: 12,
//                 },
//             },
//         ],
//         [
//             {
//                 a: {
//                     b: {
//                         c: 123,
//                     },
//                 },
//             },
//             {
//                 "a.b": {
//                     c: 123,
//                 },
//             },
//         ],
//         [
//             {
//                 a: 1,
//                 b: {
//                     ba: 21,
//                 },
//                 c: {
//                     ca: {
//                         caa: 311,
//                     },
//                 },
//                 d: {
//                     da: {
//                         daa: {
//                             daaa: 4111,
//                             daab: 4112,
//                         },
//                         dab: {
//                             daba: 4121,
//                             dabb: 4122,
//                         },
//                     },
//                 },
//                 e: {
//                     properties: {
//                         p1: {
//                             items: {},
//                             type: "array",
//                         },
//                     },
//                     type: "object",
//                 },
//             },
//             {
//                 "a": 1,
//                 "b": {
//                     ba: 21,
//                 },
//                 "c.ca": {
//                     caa: 311,
//                 },
//                 "d.da.daa": {
//                     daaa: 4111,
//                     daab: 4112,
//                 },
//                 "d.da.dab": {
//                     daba: 4121,
//                     dabb: 4122,
//                 },
//                 "e.p1": {
//                     items: {},
//                     type: "array",
//                 },
//             },
//         ],
//         [
//             {
//                 a: {
//                     ab: 12,
//                 },
//                 b: {
//                     properties: {
//                         prop1: {
//                             type: "type1",
//                         },
//                         prop2: {
//                             type: "type2",
//                         },
//                     },
//                 },
//             },
//             {
//                 "a": {
//                     ab: 12,
//                 },
//                 "b.prop1": {
//                     type: "type1",
//                 },
//                 "b.prop2": {
//                     type: "type2",
//                 },
//             },
//         ],
//     ];

//     test.each(testInputOutput)(
//         "flattens input json %j so the output is %j",
//         (input, expectedResult) => {
//             expect(flattenBranches(input)).toEqual(expectedResult);
//         },
//     );
// });

describe('transformArrayToString', () => {
    const testInputOutput: Array<[any, any]> = [
        [
            {
                a: [
                    'first',
                    'second',
                    'third',
                ],
            },
            {
                a: 'first+++second+++third',
            },
        ],
        [
            {
                a: [
                    1,
                    2,
                    3,
                ],
            },
            {
                a: '1+++2+++3',
            },
        ],
    ];

    test.each(testInputOutput)(
        'for each property of input json %j named as \'type\' replaces \
its \'array\' value with \'string\' and removes property \'items\' so the output is %j',
        (input, expectedResult) => {
            const res: any = transformArrayToString(input, '+++');
            expect(res).toEqual(expectedResult);
        },
    );
});
