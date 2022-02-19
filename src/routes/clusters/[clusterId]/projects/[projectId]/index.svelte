<script lang="ts">
	import { page } from '$app/stores';
	import type { ProjectType } from '$lib/types/ranchertypes';
	import { onMount } from 'svelte';
	import { favoriteProjects } from '$lib/stores/favorites';
	import { getProject } from '$lib/api/localApiClient';
	import { selectedProject } from '$lib/stores/selected';

	let { projectId } = $page.params;

	let project: ProjectType;
	$: project = Object.values($favoriteProjects)
		.flat()
		.find(({ id }) => id === projectId);

	onMount(async () => {
		project = await getProject(projectId);
	});

	$: $selectedProject = project;
</script>

<svelte:head>
	<title>Rancher Dashboard - Project - {project?.name}</title>
</svelte:head>

<div>
	{projectId} - {project?.name}
</div>
