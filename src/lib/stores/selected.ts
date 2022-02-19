import { writable } from 'svelte/store';
import type { ClusterType, ProjectType } from '$lib/types/ranchertypes';

export const selectedProject = writable<ProjectType>();
export const selectedCluster = writable<ClusterType>();
selectedCluster.subscribe(() => {
	selectedProject.set(undefined);
});
