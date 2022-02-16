import { localStoreWritable } from '$lib/stores/localStoreWritable';

const initialToken = import.meta.env.VITE_RANCHER_AUTH_TOKEN || '';
export const authToken = localStoreWritable('authToken', initialToken);

const initialRancherUrl = import.meta.env.VITE_RANCHER_WEB_URL || '';
export const rancherUrl = localStoreWritable('rancherUrl', initialRancherUrl);
