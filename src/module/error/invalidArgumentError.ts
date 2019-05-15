/**
 * Error intended to be used to communicate the case when function argument has invalid value.
 */
export class InvalidArgumentError extends Error {
    private argName: string;

    constructor(argName: string, message: string = 'Invalid argument') {
        super(message);
        this.argName = argName;
    }

    public getArgName(): string {
        return this.argName;
    }
}
