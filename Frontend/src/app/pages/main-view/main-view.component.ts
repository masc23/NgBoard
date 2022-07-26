import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/services/rest/auth.service';
import { User } from 'src/app/models/user';


@Component({
    selector:    'main-view',
    templateUrl: './main-view.component.html',
    styleUrls: [ './main-view.component.css' ]
})
export class MainViewComponent implements OnInit
{
    @Output()
    stateUpdated: EventEmitter<string> = new EventEmitter();

    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );

    versionString : string = "";

    user : User = {} as User;

    constructor(private breakpointObserver : BreakpointObserver, private authService : AuthService)
    {
        this.versionString = environment.version;
    }

    ngOnInit() : void
    {
        this.user = this.authService.currentUser;
    }
}
