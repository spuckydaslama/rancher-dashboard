<script lang="ts">
	import ClusterBox from '$lib/components/clusters/ClusterBox.svelte';
	import DashboardBoxGrid from '$lib/components/atoms/dashboard/DashboardBoxGrid.svelte';
	import type { ClusterType } from '$lib/types/ranchertypes';

	export let clusters: ClusterType[] | undefined;
</script>

<DashboardBoxGrid loading={!clusters}>
	{#if clusters}
		{#each clusters as cluster}
			<ClusterBox {cluster} />
		{/each}
	{/if}
</DashboardBoxGrid>
