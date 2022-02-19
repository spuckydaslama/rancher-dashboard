<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { getProjects } from '$lib/api/localApiClient';
	import ProjectDashboard from '$lib/components/projects/ProjectDashboard.svelte';
	import type { ProjectType } from '$lib/types/ranchertypes';

	const { clusterId } = $page.params;

	let projects: ProjectType[];
	onMount(async () => {
		projects = await getProjects(clusterId);
	});
</script>

<svelte:head>
	<title>Rancher Dashboard - Projects</title>
</svelte:head>

<ProjectDashboard {clusterId} {projects} />
