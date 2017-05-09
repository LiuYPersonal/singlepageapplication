import { Comment } from './comment.model';
export class Message {
    
    constructor(public content: string, 
                public create_date: number,
                public username?: string, 
                public messageId?: string, 
                public userId?: string, 
                public likes?: number,
                public comments?: Comment[]) 
                {}
}