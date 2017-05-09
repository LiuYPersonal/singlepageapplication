import { Routes, RouterModule } from "@angular/router";
import { SignupComponent } from "./signup.component";
import { SigninComponent } from "./signin.component";
import { ProfileComponent } from "./profile.component";
import { UserComponent } from "./users.component";

const AUTH_ROUTES: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'profile', component: ProfileComponent},
    { path: 'users', component: UserComponent }
];

export const authRouting = RouterModule.forChild(AUTH_ROUTES);