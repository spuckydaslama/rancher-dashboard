<script lang="ts">
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { ProjectType } from '$lib/types/ranchertypes';
	import { favoriteProjects, showOnlyFavourites } from '$lib/stores/favorites';
	import { isUniquePredicate } from '$lib/utils/arrays';
	import ProjectBox from '$lib/components/projects/ProjectBox.svelte';

	export let clusterId: string | undefined;
	export let projects: ProjectType[] | undefined;

	$: favoriteProjectsForThisCluster = $favoriteProjects[clusterId];

	$: dynamicAndStoredProjects = [...(projects || []), ...(favoriteProjectsForThisCluster || [])]
		.filter(isUniquePredicate((p) => p.id))
		.sort((p1, p2) => p1.id.localeCompare(p2.id));

	$: filteredProjects =
		$showOnlyFavourites && dynamicAndStoredProjects && favoriteProjectsForThisCluster?.length > 0
			? dynamicAndStoredProjects.filter((project) =>
					favoriteProjectsForThisCluster.some(({ id }) => id === project.id)
			  )
			: dynamicAndStoredProjects;
</script>

<DashboardBoxGrid
	loading={!projects && (!$showOnlyFavourites || !favoriteProjectsForThisCluster?.length)}
>
	{#if filteredProjects}
		{#each filteredProjects as project}
			<ProjectBox {clusterId} {project} />
		{/each}
	{/if}
</DashboardBoxGrid>
