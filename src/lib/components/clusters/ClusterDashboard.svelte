<script lang="ts">
	import ClusterBox from '$lib/components/clusters/ClusterBox.svelte';
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { favoriteClusters, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';

	export let clusters: ClusterType[] | undefined;
	$: dynamicAndStoredClusters = [...(clusters || []), ...($favoriteClusters || [])].filter(
		isUniquePredicate((c) => c.id)
	);

	$: filteredClusters =
		$showOnlyFavourites && dynamicAndStoredClusters
			? dynamicAndStoredClusters.filter((cluster) =>
					$favoriteClusters.some(({ id }) => id === cluster.id)
			  )
			: dynamicAndStoredClusters;
</script>

<DashboardBoxGrid loading={!clusters && !$showOnlyFavourites}>
	{#if filteredClusters}
		{#each filteredClusters as cluster}
			<ClusterBox {cluster} />
		{/each}
	{/if}
</DashboardBoxGrid>
