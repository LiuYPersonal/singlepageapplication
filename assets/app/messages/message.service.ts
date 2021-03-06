import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Comment } from "./comment.model";
import { Message } from "./message.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {
    }
    
    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.post('http://localhost:3000/message' + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    searchMessage(content: string){
        let searchMessages: Message[] = [];
        for (let message of this.messages){
            if(message.content.match(content)){
                searchMessages.push(message);
            }
        }
        return searchMessages;
    }


    getMessages() {
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.get('http://localhost:3000/message' + token, {headers: headers})
            .map((response: Response) => {
                const messages = response.json().obj;
                let transformedMessages: Message[] = [];
                for (let message of messages) {  
                    let mycomment: Comment[] =[];
                    for( let comment of message.comments) {
                        mycomment.push(new Comment(
                            comment.content,
                            message._id,
                            comment.time,
                            comment.username
                        ));
                    }
                    transformedMessages.push(new Message(
                        message.content,
                        message.time,
                        message.user.firstName,
                        message._id,
                        message.user._id,
                        message.likes,
                        mycomment)
                    );                  
                }
                this.messages=transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    shareLinkedin(message: Message){
        var text = { 
            "comment": message.comments[0],
            "content": {
                "title": "Share from minitwitter",
                "description": message.content,
                "submitted-url": "https://localhost:3000",  
                "submitted-image-url": "https://example.com/logo.png"
            },
            "visibility": {
                "code": "anyone"
            }};   
        const body = JSON.stringify(text);
        console.log(body);  
        const headers = new Headers({'Content-Type': 'application/json', 'x-li-format': 'json'});
        return this.http.post("https://api.linkedin.com/v1/people/~/shares?format=json", body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    addComment(comment: Comment) {
        const body = JSON.stringify(comment);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        console.log(comment);
        return this.http.post('http://localhost:3000/message/comment' + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message), 1);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

}