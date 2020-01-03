import { FavoritesState } from './../store/models/favorites-state.model';
import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeleteFavoriteAction } from '../store/actions/favorites.actions';

@Component({
  selector: 'app-favorite-item',
  templateUrl: './favorite-item.component.html',
  styleUrls: ['./favorite-item.component.scss']
})
export class FavoriteItemComponent implements OnInit {
  @Input() favoriteData
  constructor( 
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<FavoritesState>
    ) { }

  ngOnInit() {
  }

  deleteItem(id: string){
    this.store.dispatch( new DeleteFavoriteAction(id))
  }
  goToWeather(favoriteData){
    this.router.navigate(['/', { fromFavoriteItem: favoriteData}])
  }

}
