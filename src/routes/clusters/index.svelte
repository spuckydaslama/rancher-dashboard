<script lang="ts">
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { onMount } from 'svelte';
	import ClusterDashboard from '$lib/components/clusters/ClusterDashboard.svelte';
	import { authToken, rancherUrl } from '$lib/stores/settings';

	let clusters: ClusterType[];

	onMount(async () => {
		const response = await fetch('/api/clusters', {
			headers: {
				Authorization: $authToken,
				RancherUrl: $rancherUrl
			}
		});
		if (response.status === 200) {
			clusters = (await response.json()).clusters;
		} else {
			clusters = undefined;
		}
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Clusters</title>
</svelte:head>

<ClusterDashboard {clusters} />
