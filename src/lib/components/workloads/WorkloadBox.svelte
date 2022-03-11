<script lang="ts">
	import type { WorkloadType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardFavouriteSwitch from '$lib/components/atoms/dashboard/DashboardFavouriteSwitch.svelte';
	import type { FavoriteWorkload } from '$lib/types/favoritetypes';
	import { favoriteWorkloads, getFavoriteWorkload } from '$lib/stores/favorites';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import LinkToRancherWorkload from '$lib/components/workloads/LinkToRancherWorkload.svelte';
	import { ColorMode, colorModes } from '$lib/components/atoms/dashboard/colorModes';

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

	$: dockerImage = workload?.image?.split('/').slice(1).join('/');
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
	<div class="flex">
		<div class="grow text-sm italic text-gray-700">{workload.namespaceId}</div>
		<div class="text-sm">{scaleState}</div>
	</div>
	<div class="flex flex-col">
		<div class="grow">
			<div class="text-xs">{dockerImage}</div>
		</div>
		<div>
			<LinkToRancherWorkload {clusterId} {workload}>workload</LinkToRancherWorkload>
			<!--			<LinkToRancherApiUiWorkload {projectId} workloadId={workload?.id}>-->
			<!--				api-->
			<!--			</LinkToRancherApiUiWorkload>-->
		</div>
	</div>
</DashboardBox>
