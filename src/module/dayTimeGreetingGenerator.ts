import { GreetingGenerator } from "./greetingGenerator"; 

export class DayTimeGreetingGenerator implements GreetingGenerator {
    public GetGreeting() : string {
        const hours : number = new Date().getHours();
        let greeting : string = '';
        if (hours >=0 && hours < 12) {
            greeting = 'Good morning';
        } else if (hours >= 12 && hours < 18) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
        return greeting;
    }
 }