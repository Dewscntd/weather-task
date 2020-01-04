import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './features/weather/weather.component';
import { ForecastComponent } from './features/weather/forecast/forecast.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { FavoriteItemComponent } from './features/favorites/favorite-item/favorite-item.component';
import { FavoritesReducer } from './features/favorites/store/reducers/favorites.reducer';
import { HeaderComponent } from './header/header.component';
import { ForecastItemComponent } from './features/weather/forecast/forecast-item/forecast-item.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ForecastComponent,
    FavoritesComponent,
    FavoriteItemComponent,
    HeaderComponent,
    ForecastItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      favorites: FavoritesReducer
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
