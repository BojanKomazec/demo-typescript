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

    // default value of all types is: undefined
    let someNumber: number;
    // error TS2454: Variable 'someNumber' is used before being assigned.
    console.log(`Default value of type 'number' is: ${someNumber}`);
    // output: Default value of type 'number' is: undefined

    // error TS2454: Variable 'someNumber' is used before being assigned.
    if (someNumber === undefined) {
        console.log(`someNumber is undefined`);
        // output: someNumber is undefined
    }

    //  error TS2322: Type 'null' is not assignable to type 'number'.
    // but nevertheless, null can be assigned to number (or to any type)
    someNumber = null;
    if (someNumber === null) {
        console.log(`someNumber is null`);
        // output: someNumber is null
    }

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
    // error@ [tslint] Array type using 'Array<T>' is forbidden for simple types. Use 'T[]' instead.

    //
    // Tuple
    //
    console.log('--- Tuples ---');
    const v1: [number, number] = [1, 2];
    console.log(`v1[0] = ${v1[0]}`);
    // output: v1[0] = 1
    console.log(`v1[1] = ${v1[1]}`);
    // output: v1[1] = 2

    //
    // Enum
    //
    // It is allowed to be declared inside the function.
    // Numeric Enum
    enum Color {
        Blue,
        Green,
        Red, // note trailing comma
    }

    // enums are assigned numeric values, starting from 0
    const color1: Color = Color.Green;
    console.log(`color1 = ` + color1);
    // output: color1 = 1

    // it is possible to use index operator on enums
    const someEnumValue = Color[Color.Green];
    console.log(`Color[Color.Green] = ${someEnumValue}`);
    // output: Color[Color.Green] = Green

    console.log(`Color['Green'] = ${Color['Green']}`);
    // error: [tslint] object access via string literals is disallowed
    // output: Color['Green'] = 1

    const enumString = 'Green';
    const enumVal = Color[enumString];
    console.log(`Color[enumString] = ${enumVal}`);
    // output: Color[enumString] = 1

    console.log(`Object.keys(Color) = ${Object.keys(Color)}`);

    // apart from Numeric Enums, TypeScript also provides String Enums:
    // https://blogs.msdn.microsoft.com/typescript/2017/06/12/announcing-typescript-2-4-rc/
    enum WesternEuropeCountry {
        Austria = 'at',
        France = 'fr',
        Germany = 'de',
    }

    console.log(`WesternEuropeCountry['France'] = ${WesternEuropeCountry['France']}`);
    // output: WesternEuropeCountry['France'] = fr
    console.log(`WesternEuropeCountry.France = ${WesternEuropeCountry.France}`);
    // output: WesternEuropeCountry.France = fr

    const objectWhoseKeysAreMembersOfEnum: {
        [k in WesternEuropeCountry] : number;
    } = {
        at: 1,
        de: 3,
        fr: 2,
    };
    console.log(`objectWhoseKeysAreMembersOfEnum = ${objectWhoseKeysAreMembersOfEnum}`);

    // we can define a type: object whose property names are members of the enum
    type ObjectWhoseKeysAreStrictlyAllMembersOfEnum = {
        [k in WesternEuropeCountry] : number;
    };
    const objectWhoseKeysAreStrictlyAllMembersOfEnum: ObjectWhoseKeysAreStrictlyAllMembersOfEnum = {
        at: 1,
        de: 3,
        fr: 2,
        // error: Type '{ at: number; de: number; fr: number; gb: number; }' is not assignable to type
        // 'ObjectWhoseKeysAreStrictlyAllMembersOfEnum'.
        // Object literal may only specify known properties, and 'gb' does not exist in type
        // 'ObjectWhoseKeysAreStrictlyAllMembersOfEnum'.
        // gb: 4,
    };
    console.log(`objectWhoseKeysAreStrictlyAllMembersOfEnum = ${objectWhoseKeysAreStrictlyAllMembersOfEnum}`);

    // error:
    // [ts] Type '{ at: number; de: number; }' is not assignable to type 'ObjectWhoseKeysAreStrictlyAllMembersOfEnum'.
    // Property 'fr' is missing in type '{ at: number; de: number; }'.
    // const objectWhoseKeysAreStrictlyAllMembersOfEnum2: ObjectWhoseKeysAreStrictlyAllMembersOfEnum = {
    //     at: 1,
    //     de: 3,
    // };

    // we can define a type: object whose property names are members of the enum
    type ObjectWhoseKeysAreNotStrictlyAllMembersOfEnum = {
        [k in WesternEuropeCountry]? : number;
    };
    const objectWhoseKeysAreNotStrictlyAllMembersOfEnum: ObjectWhoseKeysAreNotStrictlyAllMembersOfEnum = {
        at: 1,
        de: 3,
    };
    console.log(`objectWhoseKeysAreNotStrictlyAllMembersOfEnum = ${objectWhoseKeysAreNotStrictlyAllMembersOfEnum}`);

    type WesternEurope = WesternEuropeCountry;
    // [key in WesternEurope].forEach(el => console.log(`Western Europe country: ${el}`));

    enum EasterEuropeCountry {
        Belarus,
        CzechRepublic,
        Poland,
    }

    // union of types (union of enums)
    type EuropeCountry = EasterEuropeCountry | WesternEuropeCountry;
    const europeCountry1: EuropeCountry = EasterEuropeCountry.Belarus;
    const europeCountry2: EuropeCountry = WesternEuropeCountry.Austria;

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

    //
    // void
    //
    function funcThatReturnsNoValue(): void {
        console.log(`funcThatReturnsNoValue()`);
    }

    funcThatReturnsNoValue();

    // If async task does not return any value ("fire and forget type of async
    // tasks"), its promise shall be of type Promise<void>.
    async function funcThatReturnsNoValueAsync(): Promise<void> {
        return new Promise<void>((resolve: any) => {
            setTimeout(() => {
                console.log('funcThatReturnsNoValueAsync(): Timeout reached!');
                resolve();
            },
            2000);
        });
    }
    funcThatReturnsNoValueAsync();
    // allow some time for async task from funcThatReturnsNoValueAsync() to complete
    setTimeout(() => {
        console.log('Waiting for funcThatReturnsNoValueAsync() stopped.');
    },
    3000);

    // defining a variable of the function type
    const fun1: (data: any) => void = (data) => { console.log(data); };
    fun1('This is an argument passed to fun1');

    // defining a function argument which is of the function type
    // This is very cool as fun2 is binding data and some other function.
    function fun2(message: string, fun: (data: any) => void): void {
        console.log('fun2 is calling function fun passed in as an argument...');
        fun(message);
    }
    fun2('This is a string passed to fun2', fun1);

    //
    // indexable type
    //
    // https://www.typescriptlang.org/docs/handbook/interfaces.html
    const pathMap: {[key: string]: string[]} = {
        a: ['s1', 's2'],
        ab: ['s1', 's2'],
        b: ['s3', 's4'],
    };

    //
    // make all properties optional
    //
    interface IFoo {
        a: number;
        b?: string;
        c?: boolean;
    }

    const foo1: IFoo = {
        a: 1,
    };

    const foo2: Partial<IFoo> = {
    }; // ok

    //
    // make all properties required
    //
    // error: [ts] Type '{ c: true; }' is not assignable to type 'Required<IFoo>'.
    // Property 'a' is missing in type '{ c: true; }'.
    // const foo3: Required<IFoo> = {
    //     c: true,
    // };

    const foo3: Required<IFoo> = {
        a: 1,
        b: 'a',
        c: true,
    };

}
