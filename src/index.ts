import { GreetingGenerator } from "./module/greetingGenerator";

let greetingGenerator = new GreetingGenerator();

function createGreeting(person : string) {
    return greetingGenerator.GetHourBasedGreeting() + ", " + person;
}

let user = "Bojan";
// let user = [1, 2, 3];

let greeting = createGreeting(user);

console.log(greeting);