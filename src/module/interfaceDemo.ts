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
}
