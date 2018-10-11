import { DayTimeGreeting } from './dayTimeGreeting';
import { IGreetingGenerator } from './greetingGenerator';

export class DayTimeGreetingGenerator implements IGreetingGenerator {
    public GetGreeting(): string {
        const hours: number = new Date().getHours();
        let greeting: string = '';
        if (hours >= 0 && hours < 12) {
            greeting = DayTimeGreeting.GoodMorning;
        } else if (hours >= 12 && hours < 18) {
            greeting = DayTimeGreeting.GoodAfternoon;
        } else {
            greeting = DayTimeGreeting.GoodEvening;
        }
        return greeting;
    }
 }
