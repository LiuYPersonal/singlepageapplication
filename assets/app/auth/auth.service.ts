import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";
import { Follow } from "./follow.model";
import { User } from "./user.model";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    private users: Follow[];
    constructor(private http: Http, private errorService: ErrorService) {}

    getUsers() {
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.get('http://localhost:3000/user', {headers: headers})
            .map((response: Response) => {
                const users = response.json().obj;
                let transformedUsers: Follow[] = [];
                for(let user of users){
                    transformedUsers.push(new Follow(
                        user.email,
                        user.firstName,
                        user.lastName
                    ));
                }
                this.users=transformedUsers;
                return transformedUsers;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json());
            });   
    }

    signup(user: User) {
        const body = JSON.stringify(user);
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user/signup', body, {headers: headers})
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
                const user = response.json().obj;
                let myfollowed: Follow[] = [];
                let myfollowing: Follow[] = [];
                for(let followed of user.followed){
                    myfollowed.push(new Follow(
                        followed.email,
                        followed.firstName,
                        followed.lastName
                    ));
                }
                for(let following of user.following){
                    myfollowing.push(new Follow(
                        following.email,
                        following.firstName,
                        following.lastName
                    ));
                }
                var myuser = new User(
                    user.email,
                    user.password,
                    user.firstName,
                    user.lastName,
                    user.time,
                    user.sex,
                    user.age,
                    user.interests,
                    myfollowing,
                    myfollowed
                );
                
                return myuser;
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
    searchUser(content:string){
        let searchResults: Follow[] = [];
        for (let user of this.users){
            if(user.email.match(content) || user.firstName.match(content) || user.lastName.match(content)){
                searchResults.push(user);
            }
        }
        return searchResults;
    }
    followUser(user: Follow, follow: boolean){
        const body = JSON.stringify(user);
        const token = localStorage.getItem('token')
            ? '?token=' + localStorage.getItem('token')
            : '';
        const headers = new Headers({'Content-Type': 'application/json'});
        return this.http.patch('http://localhost:3000/user/'+token+'&follow='+follow, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                this.errorService.handleError(error.json());
                return Observable.throw(error.json());
            });
    }
    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}