import fs = require('fs');

enum SomeEnum {
    Value1 = 'value1',
    Value2 = 'value2',
    Value3 = 'value3',
}

interface ISomeInterface {
    prop1: string;
    prop2: boolean;
    prop3?: number;
    prop4?: SomeEnum;
}

interface ISomeInterfaceWithFixedPropertyValue {
    prop1: SomeEnum.Value1;
    prop2: number;
}

/**
 * User-defined type guard.
 * https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html
 */
function isISomeInterfaceWithFixedPropertyValue(obj: any): obj is ISomeInterfaceWithFixedPropertyValue {
    return obj.prop1 !== undefined
        && obj.prop1 === SomeEnum.Value1
        && obj.prop2 !== undefined
        && typeof obj.prop2 === 'number';
}

interface ISomeInterface2 {
    prop1: string;
    prop2: number;
    prop3: ISomeInterfaceWithFixedPropertyValue;
}

function isISomeInterface2(obj: any): obj is ISomeInterface2 {
    return obj.prop1 !== undefined
        && obj.prop2 !== undefined
        && isISomeInterfaceWithFixedPropertyValue(obj);
}

export function interfaceDemo() {
    // error TS2322: Type '{}' is not assignable to type 'IRequest'.
    // const request: IRequest = {};

    const o1: ISomeInterface = {
        prop1: 'a',
        prop2: true,
    };
    console.log(JSON.stringify(o1));

    const o2: ISomeInterface = {
        prop1: 'a',
        prop2: true,
        prop3: 1,
    };
    console.log(JSON.stringify(o2));
    // output: {"prop1":"a","prop2":true,"prop3":1}

    // operator new can't be used on the interface type
    // error: 'ISomeInterface' only refers to a type, but is being used as a value here.
    // const o3: ISomeInterface = new ISomeInterface();

    // error: Cannot use 'new' with an expression whose type lacks a call or construct signature.
    // const o3: ISomeInterface = new o2();

    const o4: ISomeInterface = {
        prop1: 'a',
        prop2: true,
        prop4: SomeEnum.Value1,
    };
    console.log(JSON.stringify(o4));
    // output: {"prop1":"a","prop2":true,"prop4":"value1"}

    const o5 = {
        prop1: SomeEnum.Value2,
        prop2: 1,
    };

    // Type '{ prop1: SomeEnum; prop2: number; }' is not assignable to type 'ISomeInterfaceWithFixedPropertyValue'.
    // Types of property 'prop1' are incompatible.
    // Type 'SomeEnum' is not assignable to type 'SomeEnum.Value1'.
    // const o6: ISomeInterfaceWithFixedPropertyValue = o5;

    const o6: ISomeInterfaceWithFixedPropertyValue = {
        prop1: SomeEnum.Value1,
        prop2: 2,
    };

    demoUserDefinedTypeGuard();
    demoKeywordAs();
}

/**
 * https://basarat.gitbooks.io/typescript/docs/types/typeGuard.html
 */
function demoUserDefinedTypeGuard() {
    console.log('demoUserDefinedTypeGuard()');

    const o1 = {
        prop1: 'value1',
        prop2: 1,
    };

    if (isISomeInterfaceWithFixedPropertyValue(o1)) {
        console.log('o1 is ISomeInterfaceWithFixedPropertyValue'); // this is printed
    } else {
        console.log('o1 is NOT ISomeInterfaceWithFixedPropertyValue');
    }

    const o2 = {
        prop1: 'value2',
        prop2: 1,
    };

    if (isISomeInterfaceWithFixedPropertyValue(o2)) {
        console.log('o2 is ISomeInterfaceWithFixedPropertyValue');
    } else {
        console.log('o2 is NOT ISomeInterfaceWithFixedPropertyValue'); // this is printed
    }

    const o3 = {
        prop1: 'value1',
        prop3: 1,
    };

    if (isISomeInterfaceWithFixedPropertyValue(o3)) {
        console.log('o3 is ISomeInterfaceWithFixedPropertyValue');
    } else {
        console.log('o3 is NOT ISomeInterfaceWithFixedPropertyValue'); // this is printed
    }

    // let's emulate receiving potentially corrupted JSON from some external source
    const content = fs.readFileSync('data.json');
    console.log(`File content: ${content}\n`);
    const [o4, o5, o6, o7] = JSON.parse(content.toString());

    if (isISomeInterfaceWithFixedPropertyValue(o4)) {
        console.log('o4 is ISomeInterfaceWithFixedPropertyValue'); // this is printed
    } else {
        console.log('o4 is NOT ISomeInterfaceWithFixedPropertyValue');
    }

    if (isISomeInterfaceWithFixedPropertyValue(o5)) {
        console.log('o5 is ISomeInterfaceWithFixedPropertyValue');
    } else {
        console.log('o5 is NOT ISomeInterfaceWithFixedPropertyValue'); // this is printed
    }

    if (isISomeInterfaceWithFixedPropertyValue(o6)) {
        console.log('o6 is ISomeInterfaceWithFixedPropertyValue');
    } else {
        console.log('o6 is NOT ISomeInterfaceWithFixedPropertyValue'); // this is printed
    }

    if (isISomeInterfaceWithFixedPropertyValue(o7)) {
        console.log('o7 is ISomeInterfaceWithFixedPropertyValue');
    } else {
        console.log('o7 is NOT ISomeInterfaceWithFixedPropertyValue'); // this is printed
    }
}

// 'as' keyword
// https://basarat.gitbooks.io/typescript/docs/types/type-assertion.html
// https://decembersoft.com/posts/typescript-vs-csharp-as-keyword/
function demoAssigningEmptyObject() {
    interface IFoo {
         value: number;
    }

    // error: Type '{}' is not assignable to type 'IFoo'. Property 'value' is missing in type '{}'.
    // let foo: IFoo = {};
    // type {} is "an object with zero properties"

    let foo: IFoo = {} as IFoo; // ok

    foo = {
        value: 123,
    };
}

// type assertion (using 'as' to tell compiler the type of variable) happens in compile time
function demoKeywordAs() {
    interface IPerson {
        name: string;
        age: number;
    }

    const a = {
        name: 'Bojan',
    };

    let b: IPerson;

    // Type '{ name: string; }' is not assignable to type 'IPerson'.
    // Property 'age' is missing in type '{ name: string; }'.
    // b = a;

    // ok
    b = a as IPerson;

    console.log(`b.age = ${b.age}`); // "undefined"
}

function immutabilityDemo() {

    // this interface provides immutability
    interface IProduct {
        readonly id: number;
        readonly dateOfManufacture: Date;
    }

    // this is immutable object
    const product: IProduct = {
        dateOfManufacture: new Date(),
        id: 123,
    };

    // error: [ts] Cannot assign to 'id' because it is a constant or a read-only property.
    // product.id = 456;
}
