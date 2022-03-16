<script lang="ts">
	import { page } from '$app/stores';
	import { onDestroy, onMount } from 'svelte';
	import { getWorkloads } from '$lib/api/localApiClient';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import WorkloadDashboard from '$lib/components/workloads/WorkloadDashboard.svelte';

	const { clusterId, projectId } = $page.params;

	let workloads: WorkloadType[];
	let updateWorkloadsTimeout: number;
	let abortUpdateWorkloads: AbortController | undefined;
	const updateWorkloads = async () => {
		abortUpdateWorkloads = new AbortController();
		workloads = (await getWorkloads(projectId, abortUpdateWorkloads.signal)).filter(({ type }) =>
			['deployment', 'statefulSet'].includes(type)
		);
		updateWorkloadsTimeout = setTimeout(updateWorkloads, 10000) as unknown as number;
	};

	onMount(() => {
		updateWorkloads();
	});
	onDestroy(() => {
		if (abortUpdateWorkloads) {
			abortUpdateWorkloads.abort();
		}
		if (updateWorkloadsTimeout) {
			clearTimeout(updateWorkloadsTimeout);
		}
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Workloads</title>
</svelte:head>

<WorkloadDashboard {clusterId} {projectId} {workloads} />
