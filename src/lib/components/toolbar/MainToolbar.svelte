<script lang="ts">
	import DashboardToolbar from '$lib/components/atoms/dashboardToolbar/DashboardToolbar.svelte';
	import FavoritesSwitch from '$lib/components/toolbar/FavoritesSwitch.svelte';
	import { showOnlyFavourites } from '$lib/stores/favorites';
	import SettingsItem from '$lib/components/toolbar/SettingsItem.svelte';
	import HomeItem from '$lib/components/toolbar/HomeItem.svelte';
	import { selectedCluster, selectedProject } from '$lib/stores/selected';
	import type { Crumb } from '$lib/components/atoms/breadcrumb/types';
	import BreadcrumbItem from '$lib/components/atoms/breadcrumb/BreadcrumbItem.svelte';
	import { pathToCluster, pathToProject, pathToSettings } from '$lib/paths';
	const favoritesSwitchClicked = () => {
		$showOnlyFavourites = !$showOnlyFavourites;
	};

	let crumbs: Crumb[];
	$: crumbs = [
		$selectedCluster && { name: $selectedCluster.name, href: pathToCluster($selectedCluster.id) },
		$selectedCluster &&
			$selectedProject && {
				name: $selectedProject.name,
				href: pathToProject($selectedCluster.id, $selectedProject.id)
			}
	].filter((e) => !!e);
</script>

<DashboardToolbar>
	<svelte:fragment slot="main">
		<HomeItem />
		<BreadcrumbItem {crumbs} />
	</svelte:fragment>
	<svelte:fragment slot="side">
		<FavoritesSwitch value={$showOnlyFavourites} on:click={favoritesSwitchClicked} />
		<SettingsItem href={pathToSettings} />
	</svelte:fragment>
</DashboardToolbar>
