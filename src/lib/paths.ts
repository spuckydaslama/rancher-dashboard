export const pathToSettings = '/settings';
export const pathToClusters = '/clusters';
export const pathToProjects = (clusterId: string) => `/clusters/${clusterId}/projects`;
export const pathToWorkloads = (clusterId: string, projectId: string) =>
	`/clusters/${clusterId}/projects/${projectId}/workloads`;
