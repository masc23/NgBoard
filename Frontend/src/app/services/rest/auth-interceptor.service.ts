import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor
{
    constructor(private authService : AuthService, private router : Router)
    {}
    
    intercept(request : HttpRequest<any>, next : HttpHandler) : Observable<HttpEvent<any>>
    {
        const token = this.authService.getAuthToken();

        if (token)
        {
            request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }

        return next.handle(request).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse)
                {
                    if (err.status === 401)
                    {
                        this.router.navigate(["/"]);
                    }
                }
                return throwError(() => new Error(err));
            })
        )
    }
}
