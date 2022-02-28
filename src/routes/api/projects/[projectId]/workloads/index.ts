import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher, mapToWorkload } from '$lib/api/rancherApiClient';
import type { WorkloadType } from '$lib/types/ranchertypes';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(
		event.request,
		`/projects/${event.params.projectId}/workloads`
	);
	if (response.status !== 200) {
		return response;
	}

	const payload = await response.json();
	const workload: WorkloadType[] = payload.data.map(mapToWorkload);
	const body = workload as unknown as JSONValue;
	return { body, headers: { 'Cache-Control': 'max-age=30' } };
};
