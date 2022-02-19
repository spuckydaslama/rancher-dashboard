import { localStoreWritable } from '$lib/stores/localStoreWritable';
import type { FavoriteClusters, FavoriteProjects } from '$lib/types/favoritetypes';

export const showOnlyFavourites = localStoreWritable<boolean>('$showOnlyFavourites', false);

export const favoriteClusters = localStoreWritable<FavoriteClusters>('favoriteClusters', []);
export const favoriteProjects = localStoreWritable<FavoriteProjects>('favoriteProjects', {});
