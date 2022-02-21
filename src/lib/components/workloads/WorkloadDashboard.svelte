<script lang="ts">
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import { favoriteWorkloads, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';

	export let projectId: string;
	export let workloads: WorkloadType[];

	$: favoriteWorkloadsForThisProject = $favoriteWorkloads[projectId];

	$: dynamicAndStoredWorkloads = [
		...(workloads || []),
		...(favoriteWorkloadsForThisProject || [])
	].filter(isUniquePredicate((w) => w.id));

	let filteredWorkloads: WorkloadType[];
	$: filteredWorkloads =
		$showOnlyFavourites && dynamicAndStoredWorkloads && favoriteWorkloadsForThisProject
			? dynamicAndStoredWorkloads.filter((workload) =>
					favoriteWorkloadsForThisProject.some(({ id }) => id === workload.id)
			  )
			: dynamicAndStoredWorkloads;
</script>

<DashboardBoxGrid loading={!workloads && !$showOnlyFavourites}>
	{#if filteredWorkloads}
		{#each filteredWorkloads as workload}
			<div>{workload.name}-{workload.namespaceId}</div>
		{/each}
	{/if}
</DashboardBoxGrid>
