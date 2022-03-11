import type { WorkloadType } from '$lib/types/ranchertypes';

export const fetchFromRancher: (request: Request, path: string) => Promise<Response> = async (
	request,
	path
) => {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader) {
		return new Response(null, { status: 401 });
	}
	const rancherUrl = request.headers.get('RancherUrl');
	if (!rancherUrl) {
		return new Response(null, { status: 400 });
	}
	const apiUrl = rancherUrl + import.meta.env.VITE_RANCHER_API_PATH;
	return fetch(`${apiUrl}${path}`, {
		headers: {
			Authorization: authHeader
		}
	});
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mapToWorkload: (payload: any) => WorkloadType = (payload) => {
	const { id, name, namespaceId, type, scale, containers } = payload;
	const status = payload[`${type}Status`];
	const readyReplicas = status?.readyReplicas;
	const image = containers?.[0]?.image;
	return {
		id,
		name,
		namespaceId,
		type,
		scale,
		readyReplicas,
		image
	};
};
