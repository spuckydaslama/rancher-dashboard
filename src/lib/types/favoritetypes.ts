import type { ClusterType, ProjectType, WorkloadType } from '$lib/types/ranchertypes';

export type FavoriteWorkload = Pick<WorkloadType, 'name' | 'id' | 'namespaceId'>;

export type FavoriteWorkloads = { [projectId: string]: FavoriteWorkload[] };

export type FavoriteProject = Pick<ProjectType, 'name' | 'id'>;

export type FavoriteProjects = { [clusterId: string]: FavoriteProject[] };

export type FavoriteCluster = Pick<ClusterType, 'name' | 'id'>;

export type FavoriteClusters = FavoriteCluster[];
