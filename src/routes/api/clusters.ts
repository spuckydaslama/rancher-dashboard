import type { RequestHandler } from '@sveltejs/kit';
import type { ClusterType } from '$lib/types/ranchertypes';
import type { JSONValue } from '@sveltejs/kit/types/helper';

export const get: RequestHandler = async () => {
	const rancherAuthToken = import.meta.env.VITE_RANCHER_AUTH_TOKEN as string;
	const apiUrl = import.meta.env.VITE_RANCHER_API_URL;
	const response = await fetch(`${apiUrl}/clusters`, {
		headers: {
			Authorization: rancherAuthToken
		}
	});
	const payload = await response.json();
	const clusters: ClusterType[] = payload.data.map(({ id, name }) => ({ id, name }));
	const clusterBody = clusters as unknown as JSONValue;
	return { body: { clusters: clusterBody } };
};
