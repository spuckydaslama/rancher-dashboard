<script lang="ts">
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardFavouriteSwitch from '$lib/components/atoms/dashboard/DashboardFavouriteSwitch.svelte';
	import type { FavoriteWorkload } from '$lib/types/favoritetypes';
	import { favoriteWorkloads, getFavoriteWorkload } from '$lib/stores/favorites';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import LinkToRancherWorkload from '$lib/components/workloads/LinkToRancherWorkload.svelte';
	import { ColorMode, colorModes } from '$lib/components/atoms/dashboard/colorModes';
	import { onDestroy, onMount } from 'svelte';
	import { getWorkload } from '$lib/api/localApiClient';
	import LinkToRancherApiUiWorkload from '$lib/components/workloads/LinkToRancherApiUiWorkload.svelte';
	import IconRefresh from '$lib/components/atoms/icons/IconRefresh.svelte';
	import { browser } from '$app/env';

	export let clusterId: string;
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

	$: scaleState = `${workload.readyReplicas !== undefined ? workload.readyReplicas : '?'} / ${
		workload.scale !== undefined ? workload.scale : '?'
	} `;

	const getScaleColorMode = (readyReplicas: number, scale: number): ColorMode => {
		if (readyReplicas === undefined || scale === undefined) {
			return colorModes.info;
		} else if (readyReplicas === 0 || scale === 0) {
			return colorModes.error;
		} else if (readyReplicas < scale) {
			return colorModes.warn;
		} else {
			return colorModes.success;
		}
	};
	$: scaleColorMode = getScaleColorMode(workload.readyReplicas, workload.scale);

	let loadingDetails: boolean;
	let updateDetailsTimeout: number;
	const abortWorkload = new AbortController();
	const abortLoadingDetails = () => {
		abortWorkload.abort();
		if (updateDetailsTimeout) {
			clearTimeout(updateDetailsTimeout as number);
		}
	};
	const updateDetails = () => {
		if (loadingDetails) {
			return;
		}
		if (browser) {
			updateDetailsTimeout = setTimeout(async () => {
				loadingDetails = true;
				workload = await getWorkload(projectId, workload.id, abortWorkload.signal);
				loadingDetails = false;
				updateDetails();
			}, 10000 + 20000 * Math.random()) as unknown as number;
		}
	};

	onMount(() => {
		updateDetails();
	});
	onDestroy(() => {
		abortLoadingDetails();
	});
</script>

<DashboardBox colorMode={scaleColorMode}>
	<DashboardFavouriteSwitch
		value={!!favoriteWorkload}
		on:click={handleFavoriteChanged}
		class="absolute right-1 top-1 h-6 w-6"
	/>
	<div>
		<DashboardBoxName>{workload.name}</DashboardBoxName>
	</div>
	<div>
		<span class="text-sm text-gray-700">{workload.namespaceId}</span>
	</div>
	<div class="flex items-center">
		<span>{scaleState}</span>
	</div>
	<div>
		<LinkToRancherWorkload {clusterId} {workload}>workload</LinkToRancherWorkload>
		<LinkToRancherApiUiWorkload {projectId} workloadId={workload?.id}>
			api
		</LinkToRancherApiUiWorkload>
	</div>
</DashboardBox>
