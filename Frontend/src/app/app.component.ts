import { Component, OnInit } from '@angular/core';
import { User } from './models/user';
import { AuthService } from './services/rest/auth.service';
import { UpdateService } from './services/update.service';


@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit
{
    loggedIn : boolean = false;

    constructor(private update : UpdateService, private authService : AuthService)
    {}

    ngOnInit() : void
    {
        this.authService.tryGetCurrentUser().subscribe(result => {
            if (result.success)
            {
                this.loggedIn = true;
                this.authService.setCurrentUser(result.payload as User);
            }
        });
    }

    updateState(state : string) : void
    {
        if (state === "login-success")
        {
            this.loggedIn = true;
        }
        else
        {
            this.loggedIn = false;
        }
    }
}
