<script>
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
</script>

<svelte:head>
	<title>Rancher Dashboard</title>
</svelte:head>

<h1 class="text-3xl">Welcome to the Rancher Dashboard</h1>

<DashboardBox href="/clusters">
	<DashboardBoxName>Clusters</DashboardBoxName>
</DashboardBox>
