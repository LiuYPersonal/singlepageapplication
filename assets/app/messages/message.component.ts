import { Http, Response, Headers } from "@angular/http";
import { Component, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Comment } from "./comment.model";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display: inline-block;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            text-align: right;
            font-size: 12px;
            width: 19%;
        }
    `]
})
export class MessageComponent {
    @Input() message: Message;
    
    constructor(private messageService: MessageService, private http: Http) {}

    onEdit() {
        this.messageService.editMessage(this.message);
    }

    onDelete() {
        this.messageService.deleteMessage(this.message)
            .subscribe(
                result => console.log(result)
            );
    }

    onLike() {
        this.message.likes += 1;
        this.messageService.updateMessage(this.message);
    }

    onShare(){
            var url = "https://twitter.com/intent/tweet?text=" + this.message.content;
            window.open(url, '_blank');
    }
    onShareLinkedin(){
        this.messageService.shareLinkedin(this.message)
            .subscribe(
                result => console.log(result)
            );
    }
    onSubmit(form: NgForm) {
        var comment: Comment;
        comment = new Comment(form.value.comment, this.message.messageId, Date.now());
        this.messageService.addComment(comment)
            .subscribe(
                result => console.log(result)
            );
    }

    belongsToUser() {
        return localStorage.getItem('userId') == this.message.userId;
    }
}