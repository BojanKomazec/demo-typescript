export class Person {
    // error TS1248: A class member cannot have the 'const' keyword.
    // public static const someConstant: number = 1234;

    public static readonly someReadonlyMember: number = 1234;
    public static readonly someReadonlyMemberObject: any = {
        a: 1,
        b: 'b',
    };

    protected name: string;
    protected age: number;

    private readonly privateReadonlyMember: number;

    // It is not possible to have enum inside a class
    // error TS1068: Unexpected token. A constructor, method, accessor, or property was expected.
    // enum SomeEnum {
    //     E1,
    //     E2,
    // }

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        // readonly member can be initialized in constructor
        this.privateReadonlyMember = age;
    }

    public getPrivateReadonlyMember(): number {
        return this.privateReadonlyMember;
    }

    public getName(): string {
        return this.name;
    }

    public introduce() {
        console.log(`Hi, my name is {this.name}.`);
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