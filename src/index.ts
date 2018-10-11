import { DayTimeGreetingGenerator } from './module/dayTimeGreetingGenerator';

const dayTimeGreetingGenerator = new DayTimeGreetingGenerator();

function createPersonalGreeting(person: string) {
    return dayTimeGreetingGenerator.GetGreeting() + ', ' + person + '.';
}

const user = 'Bojan';
// let user = [1, 2, 3];

const greeting = createPersonalGreeting(user);

console.log(greeting);
