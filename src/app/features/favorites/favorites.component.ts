import { FavoriteItem } from './store/models/favorite-item.model';
import { FavoritesState } from './store/models/favorites-state.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
faivorites$: Observable<Array<FavoriteItem>>    
  constructor(private store: Store<FavoritesState>) { }

  ngOnInit() {
     this.faivorites$ = this.store.select( store => store.favorites)
  }

}
