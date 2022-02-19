<script>
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import { pathToClusters } from '$lib/paths';
</script>

<svelte:head>
	<title>Rancher Dashboard</title>
</svelte:head>

<h1 class="text-3xl">Welcome to the Rancher Dashboard</h1>

<DashboardBox href={pathToClusters}>
	<DashboardBoxName>Clusters</DashboardBoxName>
</DashboardBox>
