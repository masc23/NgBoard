import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UpdateService } from 'src/app/services/update.service';


@Component({
    selector:    'main-view',
    templateUrl: './main-view.component.html',
    styleUrls: [ './main-view.component.css' ]
})
export class MainViewComponent implements OnInit
{
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );

    versionString : string = "";
    loggedIn : boolean = true;

    constructor(private breakpointObserver : BreakpointObserver, private update : UpdateService)
    {
        this.versionString = environment.version;
    }

    ngOnInit() : void
    {}
}
