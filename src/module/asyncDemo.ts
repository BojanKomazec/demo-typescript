export async function asyncDemo(): Promise<void> {
    console.log('asyncDemo()');
    await demoCatchErrorFrom_asyncFunctionWhichThrowsError();
    console.log('~asyncDemo()');
}

function asyncFunctionWhichThrowsError(n: number): Promise<number> {
    return new Promise<number>((resolve: any, reject: any) => {
        throw new Error('Error thrown from asyncFunctionWhichThrowsError');
    });
}

// Note how result variable will be left as undefined.
async function demoCatchErrorFrom_asyncFunctionWhichThrowsError(): Promise<void> {
    // Unnecessary initialization to 'undefined'. (no-unnecessary-initializer)tslint(1)
    // We need to keep this warning on as otherwise we'll get an error in result = ${result}.
    // In practice we won't have such situation as 'result' would be used only inside try block.
    let result: number = undefined as unknown as number;
    try {
        result = await asyncFunctionWhichThrowsError(123);
    } catch (err) {
        console.log(`demoCatchErrorFrom_asyncFunctionWhichThrowsError() caught error: ${err}. result = ${result}`);
        // Output:
        // Error thrown from asyncFunctionWhichThrowsError. result = undefined
    }
}
