<script lang="ts">
	import ExternalLink from '$lib/components/atoms/ExternalLink.svelte';

	export let clusterId: string;
	const rancherWebUrl = import.meta.env.VITE_RANCHER_WEB_URL;
	$: href = `${rancherWebUrl}/dashboard/c/${clusterId}/explorer/apps.deployment`;
</script>

<ExternalLink {href}>
	<slot />
</ExternalLink>
