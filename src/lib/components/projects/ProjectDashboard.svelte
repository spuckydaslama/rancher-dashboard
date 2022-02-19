<script lang="ts">
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { ProjectType } from '$lib/types/ranchertypes';
	import { favoriteProjects, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';
	import ProjectBox from '$lib/components/projects/ProjectBox.svelte';

	export let clusterId: string | undefined;
	export let projects: ProjectType[] | undefined;

	$: favoriteProjectsForThisCluster = $favoriteProjects[clusterId];

	$: dynamicAndStoredProjects = [
		...(projects || []),
		...(favoriteProjectsForThisCluster || [])
	].filter(isUniquePredicate((p) => p.id));

	$: filteredProjects =
		$showOnlyFavourites && dynamicAndStoredProjects && favoriteProjectsForThisCluster
			? dynamicAndStoredProjects.filter((project) =>
					favoriteProjectsForThisCluster.some(({ id }) => id === project.id)
			  )
			: dynamicAndStoredProjects;
</script>

<DashboardBoxGrid loading={!projects && !$showOnlyFavourites}>
	{#if filteredProjects}
		{#each filteredProjects as project}
			<ProjectBox {clusterId} {project} />
		{/each}
	{/if}
</DashboardBoxGrid>
