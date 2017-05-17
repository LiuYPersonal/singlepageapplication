import { Follow } from './follow.model';

export class User {
    constructor(public email: string,
                public password: string,
                public firstName?: string,
                public lastName?: string,
                public sex?:boolean,
                public age?:number,
                public interests?:string[],
                public create_date?: number,
                public following?: Follow[],
                public followed?: Follow[]
                ) {}
}