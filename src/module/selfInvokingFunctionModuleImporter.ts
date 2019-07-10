import { someExportedFunctionFromModuleWithSelfInvokingFunction } from './selfInvokingFunctionModule';

export function selfInvokingFuncModuleImporterDemo() {
    console.log('selfInvokingFuncModuleImporterDemo()');
    someExportedFunctionFromModuleWithSelfInvokingFunction();
    console.log('~selfInvokingFuncModuleImporterDemo()');
}
