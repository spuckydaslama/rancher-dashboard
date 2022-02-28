import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher, mapToWorkload } from '$lib/api/rancherApiClient';
import type { WorkloadType } from '$lib/types/ranchertypes';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(
		event.request,
		`/projects/${event.params.projectId}/workloads/${event.params.workloadId}`
	);
	if (response.status !== 200) {
		return response;
	}

	const workload: WorkloadType = mapToWorkload(await response.json());
	const body = workload as unknown as JSONValue;
	return { body };
};
