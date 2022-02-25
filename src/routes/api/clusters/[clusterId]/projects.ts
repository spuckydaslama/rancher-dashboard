import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher } from '$lib/api/rancherApiClient';
import type { ProjectType } from '$lib/types/ranchertypes';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(
		event.request,
		`/clusters/${event.params.clusterId}/projects`
	);
	if (response.status !== 200) {
		return response;
	}
	const payload = await response.json();
	const projects: ProjectType[] = payload.data.map(({ id, name }) => ({ id, name }));
	const body = projects as unknown as JSONValue;
	return { body, headers: { 'Cache-Control': 'max-age=60' } };
};
