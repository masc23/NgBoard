import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weather } from '../models/test';

@Injectable({
    providedIn: 'root'
})
export class TestConnectService
{
    constructor(private http : HttpClient)
    {}

    get() : Observable<Weather[]>
    {
        let url = "/api/WeatherForecast";
        return this.http.get<Weather[]>(url);
    }
}
