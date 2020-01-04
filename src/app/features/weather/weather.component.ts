import { Store } from '@ngrx/store';
import { AccuweatherService } from './../../accuweather.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, forkJoin, from } from 'rxjs';
import { tap, switchMap, map} from 'rxjs/operators'
import { FavoritesState } from '../favorites/store/models/favorites-state.model';
import { AddFavoriteAction } from '../favorites/store/actions/favorites.actions';
import { v4 as uuid} from 'uuid'

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
results$: Observable<any>
isFavorite = false;
currentData;
forecast;
cityName;
errorMsg;


searchForm: FormGroup = new FormGroup({
  cityInput: new FormControl('',[
    Validators.required,
    Validators.pattern(/^[a-zA-Z\s]*$/)
  ])
})
  constructor(
     private awService: AccuweatherService,
     private route: ActivatedRoute,
     private Store: Store<FavoritesState>
     ) { }

  ngOnInit() {
    if(this.route.snapshot.paramMap){
      console.log(this.route.snapshot.paramMap.get('cityName'))
    }
      const coords = this.awService.getLocationPositionPromise().then(
        position => {
          const { latitude: lat, longitude: lon} = position.coords
          return {
            latitude: lat,
            longitude: lon
          }
        }
      )
      this.awService.geMocktGeolocationKey()
      .pipe(
        tap( cityDetail => this.cityName = cityDetail.LocalizedName),
        switchMap( cityDetails => {
          return forkJoin(
           this.awService.getMockCurrentCondition(cityDetails.Key),
           this.awService.getMockForecast(cityDetails.Key)
          )
        }),
      ).subscribe(([currentData,dailyForecasts]) => {
       this.currentData = currentData[0],
       this.forecast = dailyForecasts.DailyForecasts
     })
  }

  onSubmit(searchForm: FormGroup){
    if(this.searchForm.valid){
      this.awService.getCityKey(this.searchForm.value.cityInput)
      .pipe(
        tap(cityDetails => this.cityName = cityDetails[0].LocalizedName),
        switchMap( cityDetails => {
          return forkJoin(
              this.awService.getCurrentCondition(cityDetails[0].Key),
              this.awService.getFiveDaysForecast(cityDetails[0].Key)
          )
        })
      ).subscribe(([currentData,dailyForecasts]) => {
        this.currentData = currentData[0],
        this.forecast = dailyForecasts.DailyForecasts
      }, (err) => {
        this.errorMsg = err
      });
      this.searchForm.reset();
    }
  }

  addToFavorites(){
    this.Store.dispatch(new AddFavoriteAction({
      id: uuid(),
      cityName: this.cityName,
      currentData: this.currentData,
      forecast: this.forecast,
      isFavorite: true
    }))
    this.isFavorite = true
}


 }












//  onSubmit(){
//   if(this.searchForm.valid){
//     this.awService.getMockAutoComplete()
//     .pipe(
//       tap(cityDetails => this.cityName = cityDetails[0].LocalizedName),
//       switchMap( cityDetails => {
//         return forkJoin(
//             this.awService.getMockCurrentCondition(cityDetails[0].Key),
//             this.awService.getMockForecast(cityDetails[0].Key)
//         )
//       })
//     ).subscribe(([currentData,dailyForecasts]) => {
//       this.currentData = currentData[0],
//       this.forecast = dailyForecasts.DailyForecasts
//     }, (err) => {
//       this.errorMsg = err
//     });
//     this.searchForm.reset();
//   }
// }