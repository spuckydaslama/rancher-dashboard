<script lang="ts">
	import ExternalLink from '$lib/components/atoms/ExternalLink.svelte';
	import { rancherUrl } from '$lib/stores/settings';
	import type { WorkloadType } from '$lib/types/ranchertypes';

	export let clusterId: string;
	export let workload: WorkloadType;

	let href: string;
	$: if ($rancherUrl && clusterId && workload) {
		href = `${$rancherUrl}/dashboard/c/${clusterId}/explorer/apps.${workload.type}/${workload.namespaceId}/${workload.name}`;
	}
</script>

<ExternalLink {href}>
	<slot />
</ExternalLink>
