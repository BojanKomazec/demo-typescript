/**
 * Error intended to be used to communicate the unexpected case when coercion of some object to boolean returns false'
 * (when it has "falsy" value). It can be used in cases when object is undefined, null or empty.
 */
export class FalsyObjectError extends Error {
    private objName: string;

    constructor(objName: string, message: string = '') {
        super(message);
        this.objName = objName;
    }

    public getObjName(): string {
        return this.objName;
    }
}
