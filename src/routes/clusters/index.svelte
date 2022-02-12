<script lang="ts">
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { onMount } from 'svelte';
	import ClusterDashboard from '$lib/components/clusters/ClusterDashboard.svelte';

	let clusters: ClusterType[];

	onMount(async () => {
		const response = await fetch('/api/clusters');
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
