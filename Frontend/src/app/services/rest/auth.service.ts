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

    getAuthToken() : string
    {
        let token = localStorage.getItem("token");        
        return token ?? "";
    }

    tryLogin(code : string) : Observable<Result>
    {
        let result = {} as Result;
        result.type = "auth-result";
        result.success = true;
        result.payload = {} as User;
        (result.payload as User).id = "123";
        (result.payload as User).name = "Martin";
        (result.payload as User).token = "123abc###";

        return of(result);
        /*
        let url = "/api/auth";
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        return this.http.post<Result>(url, code, options);
        */
    }
}
