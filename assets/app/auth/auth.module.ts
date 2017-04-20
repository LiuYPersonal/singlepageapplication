import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SigninComponent } from "./signin.component";
import { SignupComponent } from "./signup.component";
import { LogoutComponent } from "./logout.component";
import { ProfileComponent } from './profile.component';
import { authRouting } from "./auth.routing";

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        ProfileComponent,
        LogoutComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        authRouting
    ]
})
export class AuthModule {

}