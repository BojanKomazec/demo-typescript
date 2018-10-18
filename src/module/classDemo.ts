class Person {
    // error TS1248: A class member cannot have the 'const' keyword.
    // public static const someConstant: number = 1234;

    public static readonly someReadonlyMember: number = 1234;
    public static readonly someReadonlyMemberObject: any = {
        a: 1,
        b: 'b',
    };

    // It is not possible to have enum inside a class
    // error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
    // enum SomeEnum {
    //     E1,
    //     E2,
    // }

    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }

    private tester() {
        // static member has to be referenced via class name otherwise this error
        // is reported:
        // error TS2662: Cannot find name 'someReadonlyMember'. Did you mean the
        // static member 'Person.someReadonlyMember'?
        // someReadonlyMember = 4567;

        // error TS2540: Cannot assign to 'someReadonlyMember' because it is a
        // constant or a read-only property.
        // Person.someReadonlyMember = 4567;

        // readonly does not provide deep const-ness
        Person.someReadonlyMemberObject.a = 2;
    }
}

export function classDemo() {
    const p1 = new Person('Bojan');
    console.log(`p1's name is ${p1.getName()}.`);
}
