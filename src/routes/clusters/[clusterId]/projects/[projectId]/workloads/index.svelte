<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { getWorkloads } from '$lib/api/localApiClient';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import WorkloadDashboard from '$lib/components/workloads/WorkloadDashboard.svelte';

	const { clusterId, projectId } = $page.params;

	let workloads: WorkloadType[];
	let updateWorkloadsTimeout: number;
	const abortUpdateWorkloads = new AbortController();
	const updateWorkloads = async () => {
		workloads = (await getWorkloads(projectId, abortUpdateWorkloads.signal)).filter(({ type }) =>
			['deployment', 'statfulSet'].includes(type)
		);
		updateWorkloadsTimeout = setTimeout(updateWorkloads, 5000) as unknown as number;
	};

	onMount(() => {
		updateWorkloads();
	});
	onDestroy(() => {
		abortUpdateWorkloads.abort();
		if (updateWorkloadsTimeout) {
			clearTimeout(updateWorkloadsTimeout);
		}
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Workloads</title>
</svelte:head>

<WorkloadDashboard {clusterId} {projectId} {workloads} />
