//
// https://github.com/axios/axios
//
import * as axios from 'axios';
// IMPORTANT: Import syntax can be deceitful.
// Here we seemingly import all exports from the package (we import 'entire module")
// but we're only importing 'default' object which is of type Axios and is exported
// in node_modules/axios/index.d.ts in last line:
//
//      export default Axios;
//
// import * as xyz from ... seems not to be good choice of import format when package has default exports.

export function axiosImportEntireModuleDemo() {
    simpleRequestDemo();
}

const axiosDefaultExportedInstance = axios.default;

// axiosDefaultExport is exported object (named 'default' in node_modules/axios/index.d.ts) of type AxiosStatic.
// This is the only thing we can access from the package via axios
// TODO: find the explanation for this. Why we can't access other exported entities via 'axios' name?

async function simpleRequestDemo() {
    // Property 'AxiosResponse' does not exist on type 'typeof
    // import("/home/bojan/dev/github/demo-typescript/node_modules/axios/index")'.ts(2339)
    // let response = axios.AxiosResponse;

    const url = 'https://www.yahoo.com';

    // 'defaults' comes from AxiosInstance interface
    console.log(`request headers: ${JSON.stringify(axiosDefaultExportedInstance.defaults.headers)}\n`);

    // Cannot find name 'AxiosResponse'.ts(2304)
    // let response: AxiosResponse;
    let response: any;

    try {
        response = await axiosDefaultExportedInstance.get(url);
    } catch (err) {
        console.log(`AxiosInstance.get() failed. Error: ${err}`);
        return;
    }

    console.log(`response: ${JSON.stringify(response.data, null, 2)}\n`);
    console.log(`response headers: ${JSON.stringify(response.headers)}\n`);
}
