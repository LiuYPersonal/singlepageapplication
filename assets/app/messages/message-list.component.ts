import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
                   [message]="message"
                    *ngFor="let message of messages"></app-message>
        </div>
    `
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService, private router: Router) {}

    ngOnInit() {
        if(!localStorage.getItem('token')){
            this.router.navigateByUrl('/auth/signin');
        }
        else{
            this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );
        }
    }
}