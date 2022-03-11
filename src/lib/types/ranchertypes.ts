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
	type: 'job' | 'deployment' | 'statefulSet' | 'cronJob';
	scale?: number;
	readyReplicas?: number;
	image?: string;
}
