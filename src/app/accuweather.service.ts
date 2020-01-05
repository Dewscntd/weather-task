import { CurrentCondition } from './features/weather/models/current-condition.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { AutocompleteApi } from './features/weather/models/autocomplete-api.model';
import { FiveDaysForecast } from './features/weather/models/five-day-forecast.model';


const API_KEY = `?apikey=${environment.WEATHER_API_KEY}`;

@Injectable({
  providedIn: 'root'
})
export class AccuweatherService {
  private readonly AUTO_COMP_URL = `https://dataservice.accuweather.com/locations/v1/cities/autocomplete${API_KEY}`;
  private readonly CURRENT_CONDITION_URL = `https://dataservice.accuweather.com/currentconditions/v1/`;
  private readonly GEOLOCATION_URL = `https://dataservice.accuweather.com/locations/v1/cities/geoposition/search${API_KEY}`;
  private readonly FIVE_DAYS_FORECAST_URL = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;

  coords: []
  constructor(private http: HttpClient) { }


  getLocationPositionPromise(): Promise<Position> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        alert('cannot get location');
        reject();
      });
    });
  }


  getCityKey(search: string){
     return this.http.get<AutocompleteApi>(`${this.AUTO_COMP_URL}&q=${search}`)
     .pipe(
       catchError(this.ErrorHandler)
     );  
  }

  getGeolocationKey(lat: number, long: number){
      return this.http.get(`this.GEOLOCATION_URL${lat},${long}`).pipe(
        catchError(this.ErrorHandler)
      );     
  }

  getCurrentCondition(cityKey: string){
    return this.http.get<CurrentCondition>(`${this.CURRENT_CONDITION_URL}${cityKey}${API_KEY}`).pipe(
      catchError(this.ErrorHandler)
    ); 
  }

  getFiveDaysForecast(cityKey: string){
    return this.http.get<FiveDaysForecast>(`${this.FIVE_DAYS_FORECAST_URL}${cityKey}${API_KEY}&metric=true`).pipe(
      catchError(this.ErrorHandler)
    );
  }

  ErrorHandler(error: HttpErrorResponse){
    return throwError("oops something wrong");
  }

}
