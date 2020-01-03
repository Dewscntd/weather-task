import { FavoriteItem } from './../models/favorite-item.model';
import { FavoritesAction, FavoritesActionsTypes } from './../actions/favorites.actions';

const initialState: Array<FavoriteItem> = [];

export function FavoritesReducer(
    state: Array<FavoriteItem> = initialState,
    action: FavoritesAction)
    {
    switch(action.type){
        case FavoritesActionsTypes.ADD_FAVORITE:
            return [...state, action.payload];
        case FavoritesActionsTypes.DELETE_FAVORITE:
            return state.filter(item => item.id !== action.payload)
        default:
            return state;
    }
}