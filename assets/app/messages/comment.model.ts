export class Comment {
    constructor(public content: string, 
                public messageId?: string, 
                public date?: number,
                public username?: string
                ) {}
}