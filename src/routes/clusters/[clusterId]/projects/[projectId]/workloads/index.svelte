<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getWorkloads } from '$lib/api/localApiClient';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import WorkloadDashboard from '$lib/components/workloads/WorkloadDashboard.svelte';

	const { clusterId, projectId } = $page.params;

	let workloads: WorkloadType[];
	onMount(async () => {
		workloads = (await getWorkloads(projectId)).filter(({ type }) =>
			['deployment', 'statfulSet'].includes(type)
		);
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Workloads</title>
</svelte:head>

<WorkloadDashboard {clusterId} {projectId} {workloads} />
