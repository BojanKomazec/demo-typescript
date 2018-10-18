
import { classDemo } from './module/classDemo';
import { functionsDemo } from './module/functionsDemo';
import { interfaceDemo } from './module/interfaceDemo';
import { keyofDemo } from './module/keyofDemo';
import { typesDemo } from './module/typesDemo';

keyofDemo();
typesDemo();
functionsDemo();
classDemo();
interfaceDemo();

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
