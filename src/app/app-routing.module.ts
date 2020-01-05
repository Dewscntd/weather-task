import { FavoritesComponent } from './features/favorites/favorites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './features/weather/weather.component';


const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch:'full'},
  { path: 'weather', component: WeatherComponent, pathMatch:'full'},
  { path: 'weather/:cityName', component: WeatherComponent},
  { path: 'favorites', component: FavoritesComponent},
  { path: '**',  redirectTo: '/weather'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
