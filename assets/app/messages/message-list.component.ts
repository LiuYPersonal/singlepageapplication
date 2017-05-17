import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
                <form (ngSubmit)="onSubmit(f)" #f="ngForm">
                    <div class="form-group">
                        <label for="content">Search</label>
                        <input
                                type="text"
                                id="content"
                                class="form-control"
                                name="content" ngModel>
                    </div>
                    <button class="btn btn-primary" type="submit">Search</button>
                </form>
            <app-message
                   [message]="message"
                   *ngFor="let message of messages"></app-message>
        </div>
    `
})
export class MessageListComponent implements OnInit {
    messages: Message[];

    constructor(private messageService: MessageService, private router: Router) {}

    onSubmit(form: NgForm) {
        
        this.messages = this.messageService.searchMessage(form.value.content);
        form.resetForm();

    }
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