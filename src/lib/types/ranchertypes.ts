export interface ClusterType {
	id: string;
	name: string;
}

export interface ProjectType {
	id: string;
	name: string;
}

export interface WorkloadType {
	id: string;
	name: string;
	namespaceId: string;
	scale?: number;
	replicas?: number;
}
