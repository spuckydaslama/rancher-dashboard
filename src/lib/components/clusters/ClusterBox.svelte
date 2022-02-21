<script lang="ts">
	import type { ClusterType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import LinkToRancherCluster from '$lib/components/clusters/LinkToRancherCluster.svelte';
	import DashboardFavouriteSwitch from '$lib/components/atoms/dashboard/DashboardFavouriteSwitch.svelte';
	import { favoriteClusters, getFavoriteCluster } from '$lib/stores/favorites';
	import type { FavoriteCluster } from '$lib/types/favoritetypes';
	import { pathToProjects } from '$lib/paths';

	export let cluster: ClusterType;

	let favoriteCluster: FavoriteCluster;
	$: favoriteCluster = getFavoriteCluster(cluster.id);

	const handleFavoriteChanged = (event: MouseEvent) => {
		event.preventDefault();
		if (favoriteCluster) {
			$favoriteClusters = $favoriteClusters.filter((favorite) => favorite.id !== cluster.id);
		} else {
			$favoriteClusters = [...$favoriteClusters, cluster];
		}
	};
</script>

<DashboardBox href={pathToProjects(cluster.id)}>
	<DashboardFavouriteSwitch
		value={!!favoriteCluster}
		on:click={handleFavoriteChanged}
		class="absolute right-1 top-1 h-6 w-6"
	/>
	<div>
		<DashboardBoxName>{cluster.name}</DashboardBoxName>
	</div>
	<div>
		<LinkToRancherCluster clusterId={cluster.id}>zum Rancher</LinkToRancherCluster>
	</div>
</DashboardBox>
