import { FavoriteItem } from './favorite-item.model';

export interface FavoritesState  {
    readonly favorites: Array<FavoriteItem>
}