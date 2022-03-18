<script lang="ts">
	import { page } from '$app/stores';
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { onMount } from 'svelte';
	import { getFavoriteCluster } from '$lib/stores/favorites';
	import { getCluster } from '$lib/api/localApiClient';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';

	let { clusterId } = $page.params;

	let cluster: ClusterType;
	$: cluster = getFavoriteCluster(clusterId);

	onMount(async () => {
		cluster = await getCluster(clusterId);
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Cluster - {cluster?.name}</title>
</svelte:head>

<div>
	<DashboardBox href={`${$page.url.href}/projects`}>
		<DashboardBoxName>Projects</DashboardBoxName>
	</DashboardBox>
</div>
