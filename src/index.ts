
// import { classDemo } from './module/classDemo';
// import { functionsDemo } from './module/functionsDemo';
// import { httpClientDemo } from './module/httpClientDemo';
// import { interfaceDemo } from './module/interfaceDemo';
import { asyncDemo } from './module/asyncDemo';
import { errorDemo } from './module/errorDemo';
import { httpServerDemo } from './module/httpServerDemo/httpServerDemo';
import { jsonProcessingDemo } from './module/jsonProcessingDemo';
import { keyofDemo } from './module/keyofDemo';
import { knexDemo } from './module/knexDemo';
import { testDb } from './module/pgDemo';
import { selfInvokingFuncModuleImporterDemo } from './module/selfInvokingFunctionModuleImporter';
import { typesDemo } from './module/typesDemo';
import { IConfig } from './types';

// require('dotenv').config()
import * as dotenv from 'dotenv';
import { httpClientDemo } from './module/httpClientDemo';

function loadConfig(): IConfig {
    const defaultPgHost = 'localhost';
    const defaultPgDatabase = 'demo_ts';
    const defaultPgUser = 'postgres';
    const defaultPgPassword = 'postgres';
    const defaultPgPort = '5432';

    return {
        db: {
            database: process.env.DB_NAME || defaultPgDatabase,
            host: process.env.DB_HOST || defaultPgHost,
            password: process.env.DB_PASSWORD || defaultPgPassword,
            port: parseInt(process.env.DB_PORT || defaultPgPort, 10),
            user: process.env.DB_USER || defaultPgUser,
        },
    };
}

// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin
// Making Interactive Node.js Console Apps That Listen for Keypress Events • thisDaveJ
// https://stackoverflow.com/questions/12742082/nodejs-require-inside-typescript-file
// const readline = require('readline');
// readline.emitKeypressEvents(process.stdin);
// process.stdin.setRawMode(true);
// process.stdin.on('keypress', (str, key) => {
//   if (key.ctrl && key.name === 'c') {
//     process.exit();
//   } else {
//     console.log(`You pressed the "${str}" key`);
//     console.log();
//     console.log(key);
//     console.log();
//   }
// });
// console.log('Press any key...');

/**
 * To run these demos you can run the app from command line as "npm start"
 */
function runnableFromCommandLine(): void {
    // asyncDemo();
    // classDemo();
    // errorDemo();
    // functionsDemo();
    httpClientDemo();
    // httpServerDemo();
    // interfaceDemo();
    // jsonProcessingDemo();
    // keyofDemo();
    // selfInvokingFuncModuleImporterDemo();
    // typesDemo();
}

/**
 * To run these demos you have to run the app in a container, with "docker-compose up"
 */
async function runnableFromDocker(): Promise<void> {
    runnableFromCommandLine();
    const config: IConfig = loadConfig();
    await testDb(config);
    knexDemo(config);
}

async function dummyAsyncFunction(): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('dummyAsyncFunction() - setTimeout(): before calling resolve()');
            resolve();
            console.log('dummyAsyncFunction() - setTimeout(): after calling resolve()');
        }, 2000);
    });
}

/**
 * Application entry point.
 */
(async () => {
    try {
        runnableFromCommandLine();
        // await runnableFromDocker();

        // test async entry point
        // console.log('before calling dummyAsyncFunction()');
        // await dummyAsyncFunction();
        // console.log('after calling dummyAsyncFunction()');
        // ~test async entry point
    } catch (err) {
        console.log(`Error: ${err}`);
        process.exitCode = 1;
    }
})();
