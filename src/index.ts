import { DayTimeGreetingGenerator } from "./module/dayTimeGreetingGenerator";

let dayTimeGreetingGenerator = new DayTimeGreetingGenerator();

function createPersonalGreeting(person : string) {
    return dayTimeGreetingGenerator.GetGreeting() + ", " + person + ".";
}

let user = "Bojan";
// let user = [1, 2, 3];

let greeting = createPersonalGreeting(user);

console.log(greeting);