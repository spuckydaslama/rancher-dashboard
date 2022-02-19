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
