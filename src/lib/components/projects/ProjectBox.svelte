<script lang="ts">
	import type { ProjectType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import DashboardFavouriteSwitch from '$lib/components/atoms/dashboard/DashboardFavouriteSwitch.svelte';
	import { favoriteProjects, getFavoriteProject } from '$lib/stores/favorites';
	import type { FavoriteProject } from '$lib/types/favoritetypes';
	import { pathToWorkloads } from '$lib/paths';

	export let clusterId: string;
	export let project: ProjectType;

	let favoriteProject: FavoriteProject;
	$: favoriteProject = getFavoriteProject(clusterId, project.id);

	const handleFavoriteChanged = (event: MouseEvent) => {
		event.preventDefault();
		const favoriteProjectsForThisCluster = $favoriteProjects[clusterId];
		if (favoriteProject) {
			$favoriteProjects = {
				...$favoriteProjects,
				[clusterId]: favoriteProjectsForThisCluster.filter((favorite) => favorite.id !== project.id)
			};
		} else {
			$favoriteProjects = {
				...$favoriteProjects,
				[clusterId]: [...(favoriteProjectsForThisCluster || []), project]
			};
		}
	};
</script>

<DashboardBox href={pathToWorkloads(clusterId, project.id)}>
	<DashboardFavouriteSwitch
		value={!!favoriteProject}
		on:click={handleFavoriteChanged}
		class="absolute right-1 top-1 h-6 w-6"
	/>
	<div>
		<DashboardBoxName>{project.name}</DashboardBoxName>
	</div>
</DashboardBox>
