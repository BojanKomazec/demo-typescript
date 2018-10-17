// https://www.typescriptlang.org/docs/handbook/basic-types.html

export function typesDemo() {
    console.log('typesDemo()');

    //
    // boolean
    //
    let isEven: boolean; // declaration
    isEven = true; // definition/assignment
    console.log(isEven);

    const isOdd: boolean = false; // declaration and definition/assignment
    console.log(isOdd);

    //
    // number
    //
    const decimal: number = 5;
    const hex: number = 0xf00d; // note 0x
    const binary: number = 0b1010; // note 0b
    const octal: number = 0o744; // note 0o

    //
    // string
    //
    let color: string = 'pink';
    color = 'blue';

    //
    // template string
    //
    const templateString = `My favorite colour is ${color}.`;
    console.log(templateString);

    //
    // Array
    //
    const lottoCombination: number[] = [3, 23, 14, 35, 30, 1, 7];
    const lottoCombination2: Array<number> = [3, 23, 14, 35, 30, 1, 7];

    //
    // Tuple
    //

    //
    // Enum
    //
    // It is allowed to be declared inside the function.
    enum Color {
        Blue,
        Green,
        Red, // note trailing comma
    }

    // enums are assigned numeric values, starting from 0
    const color1: Color = Color.Green;
    console.log(`color1 = ` + color1);

    enum WesternEuropeCountry {
        Austria = 'at',
        France = 'fr',
        Germany = 'de',
    }

    type WesternEurope = WesternEuropeCountry;

    //[key in WesternEurope].forEach(el => console.log(`Western Europe country: ${el}`));

    //
    // any
    //
    // used for unknown types (usually of values coming from user or 3rd party
    // libraries) when writing a code
    let a: any;

    // Variable of type 'any' can be assigned any type.
    a = 1;
    a = 'a';
    a = true;
    a = [1, '1', true];
    console.log(`Array a = ${a}`); // 1,1,true

    // Also, any function can be called on it (in compile time) while in runtime
    try {
        // throws exception: TypeError: a.ThisFunctionDoesNotExist is not a function
        a.ThisFunctionDoesNotExist();
    } catch (e) {
        console.log(`Exception caught: ${e}`);
    }

    // array of elements with multiple types can be typed as any[]:
    const b: any[] = [0, '0', false];
    console.log(`Array b = ${b}`); // 0,0,false

    const x = {};
    console.log(x); // output: {}

    const y: any = {};
    console.log(y);
}
