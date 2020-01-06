import { CurrentCondition } from './models/current-condition.model';
import { FiveDaysForecast } from './models/five-day-forecast.model';
import { FavoriteItem } from './../favorites/store/models/favorite-item.model';
import { Store } from '@ngrx/store';
import { AccuweatherService } from './../../accuweather.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin, } from 'rxjs';
import { tap, switchMap, map, catchError, take} from 'rxjs/operators'
import { FavoritesState } from '../favorites/store/models/favorites-state.model';
import { AddFavoriteAction } from '../favorites/store/actions/favorites.actions';
import { v4 as uuid} from 'uuid'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
weather$: Observable<any>
isFavorite = false;
currentData: CurrentCondition;
forecast: FiveDaysForecast;
cityName: string;
errorMsg: string;

searchForm: FormGroup = new FormGroup({
  cityInput: new FormControl('',[
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)
  ])
})

  constructor(
     private awService: AccuweatherService,
     private route: ActivatedRoute,
     private store: Store<FavoritesState>
     ) { }

  ngOnInit() {
    if(this.route.snapshot.params.cityName){
      this.getWeatherByCityName(this.route.snapshot.params.cityName);
    } else {
      this.getWeatherByCityName('Tel-Aviv');
    }
  }

  onSubmit(searchForm: FormGroup){
    if(this.searchForm.valid){
      this.getWeatherByCityName(this.searchForm.value.cityInput) 
    }
  }
    getWeatherByCityName(cityName: string) {
      this.updateIsFavorite(cityName);
       this.weather$ = this.awService.getCityKey(cityName)
      .pipe(
        tap(cityDetails => this.cityName = cityDetails[0].LocalizedName),
        switchMap( cityDetails => {
          return forkJoin(
              this.awService.getCurrentCondition(cityDetails[0].Key),
              this.awService.getFiveDaysForecast(cityDetails[0].Key)
          )
        }),
        map(([currentData,dailyForecasts]) => {
          this.currentData = currentData[0]
          return {
            currentCondition: currentData[0],
            forecast: dailyForecasts.DailyForecasts
          }
        }
        ),
        catchError( err => this.errorMsg = err)
      );
    }
  

  addToFavorites(){
    this.store.dispatch(new AddFavoriteAction({
      id: uuid(),
      cityName: this.cityName,
      currentData: this.currentData,
     // for best practise i would use same observeble that i used in current weather, but for API limit i use old data in the store
    }))
    this.isFavorite = true
}

  private updateIsFavorite(city: string){
    this.store
    .pipe(
      take(1)
    )
    .subscribe((state: FavoritesState) => {
      this.isFavorite = state.favorites.some(( fav: FavoriteItem) => {
        return fav.cityName.toLowerCase() === city.toLowerCase();
      } );
    });
  }

 }
