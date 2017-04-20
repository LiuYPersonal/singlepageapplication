import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    constructor(private http: Http, private errorService: ErrorService) {}

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    signin(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }

    logout() {
        localStorage.clear();
    }

    getUser() {
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3000/user/profile'+token, {headers: headers})
            .map((response: Response) => {
                const user = new User(
                    response.json().obj.email,
                    response.json().obj.password,
                    response.json().obj.firstName,
                    response.json().obj.lastName
                );
                return user;
            })
           .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });   
    }
    updateUser(user: User){
        const body = JSON.stringify(user);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/user/profile'+token, body, {headers: headers})
            .map((response: Response) => {
                const user = new User(
                    response.json().obj.email,
                    response.json().obj.password,
                    response.json().obj.firstName,
                    response.json().obj.lastName
                );
                return user;
            })
           .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            }); 
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}