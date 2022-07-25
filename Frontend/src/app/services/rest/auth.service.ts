import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AuthService
{
    getAuthToken() : string
    {
        let token = localStorage.getItem("token");        
        return token ?? "";
    }
}
