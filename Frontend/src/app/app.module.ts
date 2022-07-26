import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MainViewComponent } from './pages/main-view/main-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AuthInterceptorService } from './services/rest/auth-interceptor.service';
import { AuthService } from './services/rest/auth.service';
import { UpdateDialogComponent } from './components/update-dialog/update-dialog.component';
import { LoginViewComponent } from './pages/login-view/login-view.component';


@NgModule({
    declarations: [
        AppComponent,
        MainViewComponent,
        DashboardComponent,
        UpdateDialogComponent,
        LoginViewComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatSliderModule,
        MatDialogModule,
        MatFormFieldModule,
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatGridListModule,
        MatCardModule,
        MatMenuModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: environment.production,
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule
{}
