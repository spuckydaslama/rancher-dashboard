import type { RequestHandler } from '@sveltejs/kit';
import type { JSONValue } from '@sveltejs/kit/types/helper';
import { fetchFromRancher } from '$lib/api/rancherApiClient';
import type { ProjectType } from '$lib/types/ranchertypes';

export const get: RequestHandler = async (event) => {
	const response = await fetchFromRancher(event.request, `/projects/${event.params.projectId}`);
	if (response.status !== 200) {
		return response;
	}
	const { id, name } = await response.json();
	const project: ProjectType = { id, name };
	const body = project as unknown as JSONValue;
	return { body };
};
