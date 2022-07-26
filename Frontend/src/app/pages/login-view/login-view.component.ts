import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/rest/auth.service';


@Component({
    selector:    'login-view',
    templateUrl: './login-view.component.html',
    styleUrls: [ './login-view.component.css' ]
})
export class LoginViewComponent implements OnInit
{
    @Output()
    stateUpdated : EventEmitter<string> = new EventEmitter();

    loginCode : string = "";
    error : string = "";
    
    constructor(private authService : AuthService)
    {}

    ngOnInit() : void
    {
        let code = localStorage.getItem("login-code");
        this.loginCode = code ?? "";
    }

    tryLogin() : void
    {
        if (this.loginCode.length > 0)
        {
            this.authService.tryLogin(this.loginCode).subscribe(result => {
                if (result.success && result.type == "auth-result")
                {
                    this.authService.currentUser = result.payload as User;
                    this.stateUpdated.emit("login-success");
                }
                else
                {
                    let errorMessage = result.payload as string;
                    this.error = errorMessage;
                }
            });
        }
        else
        {
            this.error = "Der Code muss angegeben werden!";
        }
    }
}
