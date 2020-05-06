//
// https://github.com/axios/axios
//
// To determine which form of import to use we need to inspect .d.ts file of a given module (axis in this case).
//
// node_modules/axios/index.d.ts contains default export:
//
//      export interface AxiosStatic extends AxiosInstance {...}
//      declare const Axios: AxiosStatic;
//      export default Axios;
//
// That means if we import default the default export:
//
//      import axios from 'axios';
//
// ...we'll only import a variable of type AxiosStatic interface.
// This object (instance) is actally created somewhere in axios package.
// axios will be its alias and this can be any name, e.g. axiosDefaultExportedInstance.
// BUT other types will NOT be imported, e.g.:
//
//      let response: AxiosResponse;
//
// ...would trigger ts(2304) error: Cannot find name 'AxiosResponse'.
//
// If we try:
//
//      import {axios, AxiosResponse} from 'axios';
//
// ...this won't compile as axios module does not export object with exact name 'axios'.
// We'd see ts(2614) error:
//
//      Module '"../../../node_modules/axios"' has no exported member 'axios'. Did you mean to use
//      'import axios from "../../../node_modules/axios"' instead?
//
// What works is importing all exports we need but making sure that default export is NOT placed
// within the curly braced list of named exports:

import axiosDefaultExportedInstance, { AxiosResponse } from 'axios';
import { IConfig } from '../../types';

export function axiosImportSomeExportsDemo(config: IConfig) {
    // requestSentByDefaultImportedAxiosObject();
    // requestWithTimeoutSentByDefaultImportedAxiosObject();
    // requestWithTimeoutFixSentByDefaultImportedAxiosObject();
    // requestWithTimeoutFix2SentByDefaultImportedAxiosObject();
    testTimeoutFix(config);
    // axiosDemoTimeoutSetDurinCreation();
}

async function requestSentByDefaultImportedAxiosObject() {
    const url = 'https://www.google.com';

    // 'defaults' comes from AxiosInstance interface
    console.log(`request headers: ${JSON.stringify(axiosDefaultExportedInstance.defaults.headers)}\n`);
    let response: AxiosResponse;

    try {
        response = await axiosDefaultExportedInstance.get(url);
    } catch (err) {
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response: ${JSON.stringify(response.data, null, 2)}\n`);
    console.log(`response headers: ${JSON.stringify(response.headers)}\n`);
}

// Code in this function exhibits a bug in axios: timeout set in get method is not respected.
// We set it to 10 seconds but request returns failure after 130 seconds.
// Output:
// Sending request at: Thu Apr 30 2020 19:10:55 GMT+0100 (British Summer Time)
// Request failed at: Thu Apr 30 2020 19:13:05 GMT+0100 (British Summer Time)
// AxiosInstance.get() failed. Error: Error: connect ETIMEDOUT 93.184.216.34:81
async function requestWithTimeoutSentByDefaultImportedAxiosObject() {
    // https://stackoverflow.com/questions/100841/artificially-create-a-connection-timeout-error
    const url = 'https://www.example.com:81';

    let response: AxiosResponse;
    const timeoutValue = 10000; // ms

    try {
        // Date.now() gets printed as UNIX time: 1588270097785
        // new Date() gets printed as Thu Apr 30 2020 19:10:55 GMT+0100 (British Summer Time)
        console.log('Sending request at: ' + new Date());
        response = await axiosDefaultExportedInstance.get(url, {timeout: timeoutValue});
    } catch (err) {
        console.log('Request failed at: ' + new Date());
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response.status: ${JSON.stringify(response.status, null, 2)}\n`);
}

async function requestWithTimeoutFixSentByDefaultImportedAxiosObject() {

    const url = 'https://www.example.com:81';

    let response: AxiosResponse;
    const timeoutValue = 10000; // ms
    // timeout fix (which does not work):
    axiosDefaultExportedInstance.defaults.timeout = timeoutValue;

    try {
        console.log('Sending request at: ' + new Date());
        response = await axiosDefaultExportedInstance.get(url);
    } catch (err) {
        console.log('Request failed at: ' + new Date());
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response.status: ${JSON.stringify(response.status, null, 2)}\n`);
}

async function requestWithTimeoutFix2SentByDefaultImportedAxiosObject() {
    const url = 'https://www.example.com:81';

    let response: AxiosResponse;
    const timeoutValue = 10000; // ms
    // timeout fix (which does not work):
    const axiosHttpClient = axiosDefaultExportedInstance.create();
    axiosHttpClient.defaults.timeout = timeoutValue;

    try {
        console.log('Sending request at: ' + new Date());
        response = await axiosHttpClient.get(url);
    } catch (err) {
        console.log('Request failed at: ' + new Date());
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response.status: ${JSON.stringify(response.status, null, 2)}\n`);
}

// from: https://github.com/axios/axios/issues/647
// the timeout in axios is response timeout, not connection timeout, for example if you connect a local ip address
// 192.168.11.11 which dose not exist, it will take a long time, the timeout looks like invalid , but if you connect
// to a normal, well-connected server , the timeout take effects.
//
// See also:
// https://github.com/axios/axios/issues/2143
// https://github.com/axios/axios/issues/1503
//
// Using cancel mechanism is the only way to achieve request timeout. Setting timeout does not have effect if
// url is unreachable.
async function requestWithTimeoutFix3SentByDefaultImportedAxiosObject(config: IConfig, url: string) {
    let response: AxiosResponse;
    // timeout fix (which works as it applies timeout on sending request; not on receiving response as previous fixes):
    const CancelToken = axiosDefaultExportedInstance.CancelToken;
    const source = CancelToken.source();
    const timeoutId = setTimeout(
        () => source.cancel('timeout'),
        config.http.httpRequestTimeout,
    );

    try {
        console.log('Sending request at: ' + new Date());
        response = await axiosDefaultExportedInstance.get(url, {
            cancelToken: source.token,
            timeout: config.http.httpResponseTimeout,
        });
    } catch (err) {
        console.log('AxiosInstance.get() failed at: ' + new Date());
        if (axiosDefaultExportedInstance.isCancel(err)) {
            console.log(`AxiosInstance.get() canceled. Error: ${err}`);
        } else {
            console.log(`AxiosInstance.get() failed. Error: ${err}`);
        }
        return;
    } finally {
        clearTimeout(timeoutId);
    }

    console.log(`response.status: ${JSON.stringify(response.status, null, 2)}\n`);
}

async function testTimeoutFix(config: IConfig) {
    const urlUnreachable = 'https://www.example.com:81';
    await requestWithTimeoutFix3SentByDefaultImportedAxiosObject(config, urlUnreachable);

    const urlReachable = 'https://www.google.com/';
    await requestWithTimeoutFix3SentByDefaultImportedAxiosObject(config, urlReachable);
}

async function simpleRequestDemo() {
    const url = 'https://www.google.com';

    // 'defaults' comes from AxiosInstance interface
    console.log(`request headers: ${JSON.stringify(axiosDefaultExportedInstance.defaults.headers)}\n`);
    let response: AxiosResponse;

    try {
        response = await axiosDefaultExportedInstance.get(url);
    } catch (err) {
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response: ${JSON.stringify(response.data, null, 2)}\n`);
    console.log(`response headers: ${JSON.stringify(response.headers)}\n`);
}

// async function axiosDemoTimeoutSetDurinCreation() {
//     const httpClient = axiosDefaultExportedInstance.create({
//         timeout: 10000,
//     });

//     const url = 'http://example.com:81';
//     console.log(`request headers: ${JSON.stringify(httpClient.defaults.headers)}`);
//     let response: AxiosResponse;

//     try {
//         response = await httpClient.get(url);
//     } catch (err) {
//         console.log(`axios.get() failed. Error: ${err}`);
//         return;
//     }

//     console.log(`response: ${JSON.stringify(response.data, null, 2)}`);
//     console.log(`response headers: ${JSON.stringify(response.headers)}`);
// }
