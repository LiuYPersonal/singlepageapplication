import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
@Component({
    selector: 'app-header',
    template: `
        <div class="row">
            <ul class="nav nav-pills col-sm-8">
                <li routerLinkActive="active"><a [routerLink]="['/messages']">Messenges</a></li>
            </ul>
            <ul class="nav nav-pills col-sm-4">
                <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signup']">Signup</a></li>
                <li routerLinkActive="active" *ngIf="!isLoggedIn()"><a [routerLink]="['/auth/signin']">Signin</a></li>
                <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/auth/profile']">Profile</a></li>
                <li routerLinkActive="active" *ngIf="isLoggedIn()"><a [routerLink]="['/auth/logout']">Logout</a></li>
            </ul>
        </div>
    `
})
export class HeaderComponent {
    constructor(private authService: AuthService) {}
    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}