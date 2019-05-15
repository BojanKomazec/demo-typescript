/* tslint:disable: no-var-requires */
const fsPromise = require('fs').promises;

async function processJsonData(posts: any[], diskFilePath: string): Promise<void> {
    const jsonDataString = JSON.stringify(posts, null, 2);
    await fsPromise.writeFile(diskFilePath, jsonDataString);
}
