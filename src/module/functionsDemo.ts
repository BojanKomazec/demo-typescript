import { DayTimeGreetingGenerator } from './dayTimeGreetingGenerator';

export function functionsDemo() {
    const dayTimeGreetingGenerator = new DayTimeGreetingGenerator();

    // optional argument
    function createPersonalGreeting(person: string,  exclamationMark?: string) {
        // console.log(typeof exclamationMark);
        return dayTimeGreetingGenerator.GetGreeting()
                + ', '
                + person
                + ((typeof exclamationMark === 'undefined') ? '.' : exclamationMark);
    }

    const user = 'Bojan';
    // let user = [1, 2, 3];

    const greeting = createPersonalGreeting(user);
    console.log(greeting);
    const greetingWithExclamationMark = createPersonalGreeting(user, '!');
    console.log(greetingWithExclamationMark);

    // lambda ("fat arrow" function) returning a non-const value
    const ReverseString = (s: string) => {
        let index: number = s.length;
        let reversed: string = '';
        while (index > 0) {
            index = index - 1;
            reversed += s.charAt(index);
        }
        return reversed;
    };
    console.log(ReverseString('Bojan'));

    // lambda ("fat arrow" function) returning a constant
    const GetPi = () => 3.14;
    console.log(GetPi());

}