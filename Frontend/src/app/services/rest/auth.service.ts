import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Result } from 'src/app/models/result';
import { User } from 'src/app/models/user';


@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    currentUser : User  = {} as User;

    constructor(private http : HttpClient)
    {
        this.currentUser.id = "0";
    }

    setCurrentUser(user : User) : void
    {
        localStorage.setItem("token", user.token);
        this.currentUser = user;
    }

    getAuthToken() : string
    {
        let token = localStorage.getItem("token");        
        return token ?? "";
    }

    tryLogin(code : string) : Observable<Result>
    {
        let url = "/api/auth";
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Result>(url, code, options);
    }

    tryLogout() : void
    {
        localStorage.removeItem("token");
    }

    tryGetCurrentUser() : Observable<Result>
    {
        let url = "/api/auth/user";
        return this.http.get<Result>(url);
    }
}
