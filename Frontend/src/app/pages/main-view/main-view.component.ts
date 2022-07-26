import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Component({
    selector:    'main-view',
    templateUrl: './main-view.component.html',
    styleUrls: [ './main-view.component.css' ]
})
export class MainViewComponent
{
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
        map(result => result.matches),
        shareReplay()
    );

    versionString : string = "";

    constructor(private breakpointObserver : BreakpointObserver)
    {
        this.versionString = environment.version;
    }
}
