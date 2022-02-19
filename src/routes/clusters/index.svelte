<script lang="ts">
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { onMount } from 'svelte';
	import ClusterDashboard from '$lib/components/clusters/ClusterDashboard.svelte';
	import { getClusters } from '$lib/api/localApiClient';

	let clusters: ClusterType[];

	onMount(async () => {
		clusters = await getClusters();
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Clusters</title>
</svelte:head>

<ClusterDashboard {clusters} />
