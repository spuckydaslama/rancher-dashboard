import type { RequestHandler } from '@sveltejs/kit';
import type { ClusterType } from '$lib/types/ranchertypes';
import type { JSONValue } from '@sveltejs/kit/types/helper';

export const get: RequestHandler = async (event) => {
	const authHeader = event.request.headers.get('Authorization');
	if (!authHeader) {
		return { status: 401 };
	}
	const rancherUrl = event.request.headers.get('RancherUrl');
	if (!rancherUrl) {
		return { status: 400 };
	}
	const apiUrl = rancherUrl + import.meta.env.VITE_RANCHER_API_PATH;
	const response = await fetch(`${apiUrl}/clusters`, {
		headers: {
			Authorization: authHeader
		}
	});
	if (response.status !== 200) {
		return response;
	}
	const payload = await response.json();
	const clusters: ClusterType[] = payload.data.map(({ id, name }) => ({ id, name }));
	const clusterBody = clusters as unknown as JSONValue;
	return { body: { clusters: clusterBody } };
};
