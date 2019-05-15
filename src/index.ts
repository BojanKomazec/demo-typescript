
// import { classDemo } from './module/classDemo';
// import { functionsDemo } from './module/functionsDemo';
// import { httpClientDemo } from './module/httpClientDemo';
// import { interfaceDemo } from './module/interfaceDemo';
// import { keyofDemo } from './module/keyofDemo';
// import { typesDemo } from './module/typesDemo';
import { testDb } from './module/pgDemo';
import { IConfig } from './types';

function loadConfig(): IConfig {
    const defaultPgHost = 'localhost';
    const defaultPgDatabase = 'demo_ts';
    const defaultPgUser = 'postgres';
    const defaultPgPassword = 'postgres';
    const defaultPgPort = '5432';

    return {
        db: {
            database: process.env.PGDATABASE || defaultPgDatabase,
            host: process.env.PGHOST || defaultPgHost,
            password: process.env.PGPASSWORD || defaultPgPassword,
            port: parseInt(process.env.PGPORT || defaultPgPort, 10),
            user: process.env.PGUSER || defaultPgUser,
        },
    };
}

// keyofDemo();
// typesDemo();
// functionsDemo();
// classDemo();
// interfaceDemo();
// httpClientDemo();

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
 * Application entry point.
 */
(async () => {
    try {
        const config: IConfig = loadConfig();
        await testDb(config);
    } catch (err) {
        console.log(`Error: ${err}`);
        process.exitCode = 1;
    }
})();
