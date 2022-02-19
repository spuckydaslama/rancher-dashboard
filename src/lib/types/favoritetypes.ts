import type { ClusterType, ProjectType } from '$lib/types/ranchertypes';

export type FavoriteProject = Pick<ProjectType, 'name' | 'id'>;

export type FavoriteProjects = { [clusterId: string]: FavoriteProject[] };

export type FavoriteCluster = Pick<ClusterType, 'name' | 'id'>;

export type FavoriteClusters = FavoriteCluster[];
