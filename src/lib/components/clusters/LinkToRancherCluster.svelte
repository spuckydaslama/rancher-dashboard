<script lang="ts">
	import ExternalLink from '$lib/components/atoms/ExternalLink.svelte';
	import { rancherUrl } from '$lib/stores/settings';

	export let clusterId: string;

	let href: string;
	$: if ($rancherUrl && clusterId) {
		href = `${$rancherUrl}/dashboard/c/${clusterId}/explorer/apps.deployment`;
	}
</script>

<ExternalLink {href}>
	<slot />
</ExternalLink>
