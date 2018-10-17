class Person {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    public getName(): string {
        return this.name;
    }
}

export function classDemo() {
    const p1 = new Person('Bojan');
    console.log(`p1's name is ${p1.getName()}.`);
}
