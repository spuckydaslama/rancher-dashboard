<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getWorkloads } from '$lib/api/localApiClient';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import WorkloadDashboard from '$lib/components/workloads/WorkloadDashboard.svelte';

	const { projectId } = $page.params;

	let workloads: WorkloadType[];
	onMount(async () => {
		workloads = await getWorkloads(projectId);
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Workloads</title>
</svelte:head>

<WorkloadDashboard {projectId} {workloads} />
