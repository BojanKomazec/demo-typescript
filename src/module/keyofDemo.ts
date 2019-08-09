function getProperty1(obj: {}, key: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type '{}' has no index signature.
    return obj[key];
}

// https://blog.mariusschulz.com/2017/01/06/typescript-2-1-keyof-and-lookup-types
// tslint:disable-next-line: max-line-length
// https://stackoverflow.com/questions/32968332/how-do-i-prevent-the-error-index-signature-of-object-type-implicitly-has-an-an
export function keyofDemo() {
    console.log('\n\nkeyofDemo()\n');
    console.log(typeof(getProperty1)); // output: function
    console.log(getProperty1.toString()); // output: function getProperty1(obj, key) { return obj[key]; }

    let p = getProperty1({}, '');
    console.log(p); // undefined
    p = getProperty1({id: 1}, 'id');
    console.log(p); // 1
    p = getProperty1({id: 1}, 'name');
    console.log(p); // undefined

    interface ITodoItem {
        due: Date;
        id: number;
        task: string;
    }

    type TodoKeys = keyof ITodoItem;

    const keys = Array<TodoKeys>();
    keys.push('due');
    keys.push('due');
    keys.push('id');
    // [ts] Argument of type '"task_"' is not assignable to parameter of type '"id" | "due" | "task"'.
    // keys.push('task_');

    console.log(`keys = ${keys}`);
    // output: keys = due,due,id

    const todo: ITodoItem = {
        due: new Date(2018, 11, 16),
        id: 1,
        task: 'Buy apples',
    };

    const keyDue: string = 'due';
    // Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ITodoItem'.
    // No index signature with a parameter of type 'string' was found on type 'ITodoItem'.ts(7053)
    // const valueDue: Date = todo[keyDue];
    const keyDue2: (keyof ITodoItem) = 'due';
    const valueDue: Date = todo[keyDue2];
    console.log(`valueDue = ${valueDue}`);
    // Output: valueDue = Sun Dec 16 2018 00:00:00 GMT+0000 (Greenwich Mean Time)
}
