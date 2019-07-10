export function someExportedFunctionFromModuleWithSelfInvokingFunction() {
    console.log('someExportedFunctionFromModuleWithSelfInvokingFunction()');
}

// Anonymous self-invoking function (often called "module's side effect") will run when the module is evaluated,
// which happens when module is imported at least once in some other module.
(() => {
    console.log('(!) Anonymous self-invoking function from ModuleWithSelfInvokingFunction is being executed just \
because some other function from the same module was imported by some other module.');
})();
