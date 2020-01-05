import { FavoriteItem } from './store/models/favorite-item.model';
import { FavoritesState } from './store/models/favorites-state.model';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  animations: [
    trigger('fade', [

      transition('void => *', [
        style({opacity: 0}),
        animate(1000)
      ]),

      transition('* => void',[
        animate(1000, style({opacity: 0 }))
      ])
    ])
  ]
})
export class FavoritesComponent implements OnInit {
faivorites$: Observable<FavoriteItem[]>    
  constructor(private store: Store<FavoritesState>) { }

  ngOnInit() {
     this.faivorites$ = this.store.select( store => store.favorites)
  }

}
