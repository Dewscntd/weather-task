import { Action } from '@ngrx/store';
import { FavoriteItem } from '../models/favorite-item.model';

export enum FavoritesActionsTypes{
    ADD_FAVORITE = '[Favorite] Add Favorite',
    DELETE_FAVORITE = '[Favorite] Delete Favorite'
}

export class AddFavoriteAction implements Action {
    readonly type = FavoritesActionsTypes.ADD_FAVORITE;

    constructor( public payload: FavoriteItem){}
}

export class DeleteFavoriteAction implements Action {
    readonly type = FavoritesActionsTypes.DELETE_FAVORITE;

    constructor( public payload: string){}
}


export type FavoritesAction = AddFavoriteAction | DeleteFavoriteAction;