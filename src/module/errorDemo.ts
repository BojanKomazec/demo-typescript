export function errorDemo(): void {
    console.log('errorDemo()');
    demoTryThrowFinally();
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
