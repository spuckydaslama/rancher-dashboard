<script lang="ts">
	import ExternalLink from '$lib/components/atoms/ExternalLink.svelte';
	import { rancherUrl } from '$lib/stores/settings';

	export let projectId: string;
	export let workloadId: string;

	let href: string;
	$: if ($rancherUrl && projectId && workloadId) {
		const path = `/projects/${projectId}/workloads/${workloadId}`;
		const apiUrl = $rancherUrl + import.meta.env.VITE_RANCHER_API_PATH;
		href = `${apiUrl}${path}`;
	}
</script>

<ExternalLink {href}>
	<slot />
</ExternalLink>
