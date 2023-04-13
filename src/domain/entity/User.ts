import { v4 as uuidv4 } from 'uuid';

export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public age?: number,
        public gender?: string,
        public country?: string
    ) { }

    static createNew(name: string): User {
        return new User(uuidv4(), name)
    }
}