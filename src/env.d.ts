/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_RANCHER_API_PATH: string | undefined;
	readonly VITE_RANCHER_WEB_URL: string | undefined;
	readonly VITE_RANCHER_AUTH_TOKEN: string | undefined;

	// more env variables...
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
