const todo = {
    due: new Date(2018, 11, 16),
    id: 1,
    task: 'Buy apples',
};

// error TS7017: Element implicitly has an 'any' type because type '{}' has no index signature.
function getProperty1(obj: {}, key: string) {
    return obj[key];
}

export function keyofDemo() {
    console.log(typeof(getProperty1)); // output: function
    console.log(getProperty1.toString()); // output: function getProperty1(obj, key) { return obj[key]; }

    let p = getProperty1({}, '');
    console.log(p); // undefined
    p = getProperty1({id: 1}, 'id');
    console.log(p); // 1
    p = getProperty1({id: 1}, 'name');
    console.log(p); // undefined
}
