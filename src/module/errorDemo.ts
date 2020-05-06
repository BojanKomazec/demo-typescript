export function errorDemo(): void {
    console.log('errorDemo()');
    // demoTryThrowFinally();
    demotExceptionThrownFromTryAndFinally();
    console.log('~errorDemo()');
}

// Output:
// Executing try...
// Executing finally...
// demoTryFinally() caught error: Error: Something bad happened.
function demoTryThrowFinally(): void {
    try {
        try {
            console.log(`Executing try...`);
            throw new Error('Something bad happened.');
        } finally {
            console.log(`Executing finally...`);
        }
    } catch (e) {
        console.log(`demoTryFinally() caught error: ${e}`);
    }
}

// Executing try...
// Throwing from finally...
// demotExceptionThrownFromTryAndFinally() caught error: Error: Something bad happened in finally.
function demotExceptionThrownFromTryAndFinally() {
    try {
        try {
            console.log(`Executing try...`);
            throw new Error('Something bad happened.'); // this exception will be silently swallowed/discarded
        } finally {
            console.log(`Throwing from finally...`);

            // TS linter does not allow throw statements in finally block!
            //      'throw' statements in finally blocks are forbidden. (no-unsafe-finally)tslint
            // That's why we need to suppress this warning so we can use it in our demo:
            // tslint:disable-next-line: no-unsafe-finally
            throw new Error('Something bad happened in finally.'); // this exception will be propagated further
        }
    } catch (e) {
        console.log(`demotExceptionThrownFromTryAndFinally() caught error: ${e}`);
    }
}
