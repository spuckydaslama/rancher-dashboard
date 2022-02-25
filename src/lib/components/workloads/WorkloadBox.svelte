<script lang="ts">
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardFavouriteSwitch from '$lib/components/atoms/dashboard/DashboardFavouriteSwitch.svelte';
	import type { FavoriteWorkload } from '$lib/types/favoritetypes';
	import { favoriteWorkloads, getFavoriteWorkload } from '$lib/stores/favorites';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';

	export let projectId: string;
	export let workload: WorkloadType;

	let favoriteWorkload: FavoriteWorkload;
	$: favoriteWorkload = getFavoriteWorkload(projectId, workload?.id);

	const handleFavoriteChanged = (event: MouseEvent) => {
		event.preventDefault();
		const favoriteWorkloadsForThisProject = $favoriteWorkloads[projectId];
		if (favoriteWorkload) {
			$favoriteWorkloads = {
				...$favoriteWorkloads,
				[projectId]: favoriteWorkloadsForThisProject.filter(
					(favorite) => favorite.id !== workload.id
				)
			};
		} else {
			$favoriteWorkloads = {
				...$favoriteWorkloads,
				[projectId]: [...(favoriteWorkloadsForThisProject || []), workload]
			};
		}
	};
</script>

<DashboardBox>
	<DashboardFavouriteSwitch
		value={!!favoriteWorkload}
		on:click={handleFavoriteChanged}
		class="absolute right-1 top-1 h-6 w-6"
	/>
	<div>
		<DashboardBoxName>{workload.name}</DashboardBoxName>
	</div>
</DashboardBox>
