<script lang="ts">
	import DashboardToolbar from '$lib/components/atoms/dashboardToolbar/DashboardToolbar.svelte';
	import FavoritesSwitch from '$lib/components/toolbar/FavoritesSwitch.svelte';
	import { showOnlyFavourites } from '$lib/stores/favorites';
	import SettingsItem from '$lib/components/toolbar/SettingsItem.svelte';
	import HomeItem from '$lib/components/toolbar/HomeItem.svelte';
	const favoritesSwitchClicked = () => {
		$showOnlyFavourites = !$showOnlyFavourites;
	};
</script>

<DashboardToolbar>
	<svelte:fragment slot="main">
		<HomeItem />
	</svelte:fragment>
	<svelte:fragment slot="side">
		<FavoritesSwitch value={$showOnlyFavourites} on:click={favoritesSwitchClicked} />
		<SettingsItem href="/settings" />
	</svelte:fragment>
</DashboardToolbar>
