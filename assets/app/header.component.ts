import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth/auth.service";

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
            <a class="navbar-brand" href="#">Mini Twitter</a>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="nav navbar-nav">
                    <li class="nav-item active" routerLinkActive="active"><a [routerLink]="['/messages']">Messenges</a></li>
                    <li class="nav-item active" routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/auth/users']">Users</a></li>
                    <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a class="dropdown-item" [routerLink]="['/auth/signup']">Signup</a></li>
                    <li class="dropdown-item" routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signin']">Signin</a></li>
                    <li class="dropdown-item" routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/auth/profile']">Profile</a></li>
                    <li class="dropdown-item" routerLinkActive="active" *ngIf="isLoggedIn()">
                        <div class="col-md-8 col-md-offset-2">
                            <button class="btn btn-danger" (click)="onLogout()">Logout</button>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="fb-share-button" data-href="https://localhost:3000" data-layout="button_count" data-size="small" data-mobile-iframe="false">
                <a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Facebook</a>
            </div>
        </nav>
    `
})
export class HeaderComponent {
    constructor(private authService: AuthService, private router: Router) {}

    onLogout() {
        this.authService.logout();
        this.router.navigate(['/auth', 'signin']);
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}