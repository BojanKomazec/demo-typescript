function getProperty1(obj: {}, key: string): any {
    // @ts-ignore: error TS7017: Element implicitly has an 'any' type because type '{}' has no index signature.
    return obj[key];
}

// https://blog.mariusschulz.com/2017/01/06/typescript-2-1-keyof-and-lookup-types
export function keyofDemo() {
    console.log('keyofDemo()');
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
}
