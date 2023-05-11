import { v4 as uuidv4 } from 'uuid';

export interface IUser{
    readonly id: string,
    name: string,
    age?: number,
    gender?: string,
    country?: string
}

export class User implements IUser {
    constructor(
        public readonly id: string,
        public name: string,
        public age?: number,
        public gender?: string,
        public country?: string
    ) { }

    static createNew(name: string): IUser {
        return new User(uuidv4(), name)
    }
}