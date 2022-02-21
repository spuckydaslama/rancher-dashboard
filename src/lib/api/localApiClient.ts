import { get } from 'svelte/store';
import { authToken, rancherUrl } from '$lib/stores/settings';
import type { ClusterType, ProjectType, WorkloadType } from '$lib/types/ranchertypes';

const localApiCall = async (url: string) => {
	return fetch(url, {
		headers: {
			Authorization: get(authToken),
			RancherUrl: get(rancherUrl)
		}
	});
};

export const getClusters: () => PromiseLike<ClusterType[]> | undefined = async () => {
	const response = await localApiCall('/api/clusters');
	if (response.status === 200) {
		return await response.json();
	} else {
		return undefined;
	}
};

export const getCluster: (clusterId: string) => PromiseLike<ClusterType> | undefined = async (
	clusterId
) => {
	const response = await localApiCall(`/api/clusters/${clusterId}`);
	if (response.status === 200) {
		return await response.json();
	} else {
		return undefined;
	}
};

export const getProjects: (clusterId: string) => PromiseLike<ProjectType[]> | undefined = async (
	clusterId
) => {
	const response = await localApiCall(`/api/clusters/${clusterId}/projects`);
	if (response.status === 200) {
		return await response.json();
	} else {
		return undefined;
	}
};

export const getProject: (projectId: string) => PromiseLike<ProjectType> | undefined = async (
	projectId
) => {
	const response = await localApiCall(`/api/projects/${projectId}`);
	if (response.status === 200) {
		return await response.json();
	} else {
		return undefined;
	}
};

export const getWorkloads: (projectId: string) => PromiseLike<WorkloadType[]> | undefined = async (
	projectId
) => {
	const response = await localApiCall(`/api/projects/${projectId}/workloads`);
	if (response.status === 200) {
		return await response.json();
	} else {
		return undefined;
	}
};
