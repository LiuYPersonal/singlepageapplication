import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { Follow } from "./follow.model";
import { User } from "./user.model";
import { NgForm } from "@angular/forms";
@Component({
    selector: 'app-user',
    templateUrl: './users.component.html'
})

export class UserComponent implements OnInit{
    users: Follow[];
    currentUser: User;

    constructor(private authService: AuthService, private router: Router) {}

    isCurrentUser(user: Follow){
        return (this.currentUser.email==user.email);
    }
    isFriend(user: Follow){

        for(let following of this.currentUser.following){
            if(following.email==user.email){
                return true;
            }
        }
        return false;
    }
    
    onSearch(form: NgForm) {
        console.log(form.value.content);
        this.users=this.authService.searchUser(form.value.content);
        form.resetForm();
    }

    onFollow(user: Follow){
        this.currentUser.following.push(user);
        this.authService.followUser(user, true)
            .subscribe(
                error => console.error(error)
            );
    }
    onUnFollow(user: Follow){
        var index = this.currentUser.following.indexOf(user);
        this.currentUser.following.splice(index, 1);
        this.authService.followUser(user, false)
            .subscribe(

                error => console.error(error)
            );       
    }

    ngOnInit() {
        this.authService.getUser()
            .subscribe(
                (user: User) => {
                    this.currentUser=user;
                },
                error => console.error(error)
            );
        this.authService.getUsers()
            .subscribe(
                (users: Follow[]) => {
                    this.users=users;
                },
                error => console.error(error)
            );
        
    }
}
