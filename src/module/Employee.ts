import { Person } from './Person';

// 'T extends U' means T is assignable to U (but not vice versa!)
export class Employee extends Person {
    private employerName: string;

    // each derived class that contains a constructor function must call super() which will execute the constructor of
    // the base class
    public constructor(name: string, age: number, employerName: string) {
        // Constructors for derived classes must contain a 'super' call.
        super(name, age);

        // 'super' must be called before accessing 'this' in the constructor of a derived class.
        // before we ever access a property on this in a constructor body, we have to call super()
        this.employerName = employerName;
        console.log(`Employee ${this.name} is employed by ${this.employerName}.`);
    }

    // overriding inherited method
    public introduce() {
        // call method from a base class
        super.introduce();
        console.log(`I work for ${this.employerName}.`);
    }

    public manufacture(productName: string) {
        // public and protected methods and fields are inherited
        console.log(`Employee ${this.name} manufactures ${productName}.`);
    }
}
