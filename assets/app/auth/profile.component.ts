import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "./auth.service";
import { User } from "./user.model";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit{
    
    user: User;

    constructor(private authService: AuthService, private router: Router) {}

    onSubmit(myForm: NgForm) {
        this.user.email=myForm.value.email;
        this.user.password=myForm.value.password;
        this.user.firstName=myForm.value.firstName;
        this.user.lastName=myForm.value.lastName;
        this.authService.updateUser(this.user)
            .subscribe(
                data => {
                    this.router.navigateByUrl('/');
                },
                error => console.error(error)
            );
    }

    ngOnInit() {
        this.authService.getUser()
            .subscribe(
                (user: User) => {
                    this.user=user
                    
                },
                error => console.error(error)
            );
    }
}