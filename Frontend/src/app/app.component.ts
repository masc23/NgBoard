import { Component } from '@angular/core';
import { UpdateService } from './services/update.service';


@Component({
    selector:    'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.css' ]
})
export class AppComponent
{
    loggedIn : boolean = false;

    constructor(private update: UpdateService)
    {}

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
