<script lang="ts">
	import ClusterBox from '$lib/components/clusters/ClusterBox.svelte';
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { ClusterType } from '$lib/types/ranchertypes';
	import { favoriteClusters, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';
	import type { FavoriteCluster } from '$lib/types/favoritetypes';

	export let clusters: ClusterType[] | undefined;
	let dynamicAndStoredClusters: Array<ClusterType | FavoriteCluster>;
	$: dynamicAndStoredClusters = [...(clusters || []), ...($favoriteClusters || [])]
		.filter(isUniquePredicate((c) => c.id))
		.sort((c1, c2) => c1.id.localeCompare(c2.id));

	let filteredClusters: Array<ClusterType | FavoriteCluster>;
	$: filteredClusters =
		$showOnlyFavourites && dynamicAndStoredClusters && $favoriteClusters?.length > 0
			? dynamicAndStoredClusters.filter((cluster) =>
					$favoriteClusters.some(({ id }) => id === cluster.id)
			  )
			: dynamicAndStoredClusters;
</script>

<DashboardBoxGrid loading={!clusters && (!$showOnlyFavourites || !$favoriteClusters?.length)}>
	{#if filteredClusters}
		{#each filteredClusters as cluster (cluster.id)}
			<ClusterBox {cluster} />
		{/each}
	{/if}
</DashboardBoxGrid>
