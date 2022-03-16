import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher, mapToWorkload } from '$lib/api/rancherApiClient';
import type { WorkloadType } from '$lib/types/ranchertypes';

export const get: RequestHandler = async (event) => {
	const workloadsResponse = await fetchFromRancher(
		event.request,
		`/projects/${event.params.projectId}/workloads`
	);
	if (workloadsResponse.status !== 200) {
		return workloadsResponse;
	}

	const statefulsetsResponse = await fetchFromRancher(
		event.request,
		`/projects/${event.params.projectId}/statefulsets`
	);
	if (statefulsetsResponse.status !== 200) {
		return statefulsetsResponse;
	}

	const workloadsPayload = await workloadsResponse.json();
	const statefulsetsPayload = await statefulsetsResponse.json();
	const workloads: WorkloadType[] = [
		...workloadsPayload.data.map(mapToWorkload),
		...statefulsetsPayload.data.map(mapToWorkload)
	];
	const body = workloads as unknown as JSONValue;
	return { body };
};
