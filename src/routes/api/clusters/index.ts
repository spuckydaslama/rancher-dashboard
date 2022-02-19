import type { RequestHandler } from '@sveltejs/kit';
import type { ClusterType } from '$lib/types/ranchertypes';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher } from '$lib/api/rancherApiClient';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(event.request, '/clusters');
	if (response.status !== 200) {
		return response;
	}
	const payload = await response.json();
	const clusters: ClusterType[] = payload.data.map(({ id, name }) => ({ id, name }));
	const clusterBody = clusters as unknown as JSONValue;
	return { body: clusterBody };
};
