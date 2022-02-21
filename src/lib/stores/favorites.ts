import { get } from 'svelte/store';
import { localStoreWritable } from '$lib/stores/localStoreWritable';
import type {
	FavoriteCluster,
	FavoriteClusters,
	FavoriteProject,
	FavoriteProjects
} from '$lib/types/favoritetypes';

export const showOnlyFavourites = localStoreWritable<boolean>('$showOnlyFavourites', false);

export const favoriteClusters = localStoreWritable<FavoriteClusters>('favoriteClusters', []);
export const getFavoriteCluster: (clusterId: string | undefined) => FavoriteCluster | undefined = (
	clusterId
) => get(favoriteClusters).find((cluster) => cluster.id === clusterId);
export const favoriteProjects = localStoreWritable<FavoriteProjects>('favoriteProjects', {});
export const getFavoriteProject: (
	clusterId: string | undefined,
	projectId: string | undefined
) => FavoriteProject | undefined = (clusterId, projectId) =>
	get(favoriteProjects)[clusterId]?.find((project) => project.id === projectId);
