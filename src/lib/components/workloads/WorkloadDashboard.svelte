<script lang="ts">
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import { favoriteWorkloads, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';
	import WorkloadBox from '$lib/components/workloads/WorkloadBox.svelte';
	import type { FavoriteWorkload } from '$lib/types/favoritetypes';

	export let clusterId: string;
	export let projectId: string;
	export let workloads: WorkloadType[];

	let favoriteWorkloadsForThisProject: FavoriteWorkload[];
	$: favoriteWorkloadsForThisProject = $favoriteWorkloads[projectId];

	let dynamicAndStoredWorkloads: WorkloadType[];
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
		{#each filteredWorkloads as workload (workload.id)}
			<WorkloadBox {clusterId} {projectId} {workload} />
		{/each}
	{/if}
</DashboardBoxGrid>
