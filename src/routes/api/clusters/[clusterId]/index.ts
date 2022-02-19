import type { RequestHandler } from '@sveltejs/kit';
import type { ClusterType } from '$lib/types/ranchertypes';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher } from '$lib/api/rancherApiClient';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(event.request, `/clusters/${event.params.clusterId}`);
	if (response.status !== 200) {
		return response;
	}
	const { id, name } = await response.json();
	const cluster: ClusterType = { id, name };
	const body = cluster as unknown as JSONValue;
	return { body };
};
