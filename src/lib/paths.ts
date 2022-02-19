export const pathToSettings = '/settings';
export const pathToClusters = '/clusters';
export const pathToCluster = (clusterId: string) => `/clusters/${clusterId}`;
export const pathToProjects = (clusterId: string) => `/clusters/${clusterId}/projects`;
export const pathToProject = (clusterId: string, projectId: string) =>
	`/clusters/${clusterId}/projects/${projectId}`;
