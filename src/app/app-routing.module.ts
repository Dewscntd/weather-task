import { FavoritesComponent } from './features/favorites/favorites.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WeatherComponent } from './features/weather/weather.component';


const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch:'full'},
  { path: 'favorites', component: FavoritesComponent},
  { path: '**', component: WeatherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
