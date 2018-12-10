import { Employee } from './Employee';
import { Person } from './Person';

export function classDemo() {
    const p1: Person = new Person('Bojan', 123);
    console.log(`p1's name is ${p1.getName()}.`);
    console.log(`p1's privateReadonlyMember is ${p1.getPrivateReadonlyMember()}.`);

    // error TS2554: Expected 2 arguments, but got 0.
    // An argument for 'name' was not provided.
    // const employee1: Employee = new Employee();

    // error TS2554: Expected 2 arguments, but got 1.
    // An argument for 'intValue' was not provided.
    // const employee1: Employee = new Employee('Ted Baker');

    const employee1: Employee = new Employee('Ted Baker', 123, 'Greggs');
    employee1.getName();
    employee1.manufacture('bread');

    // Type 'Person' is not assignable to type 'Employee'.
    // const employee2 : Employee = new Person('Leo Baker', 124);

    const person2: Person = new Employee('Bob Carpenter', 124, 'Focus');
    // Property 'manufacture' does not exist on type 'Person'
    // person2.manufacture('wooden table');
}
