<script lang="ts">
	import DashboardBoxSkeleton from '$lib/components/atoms/dashboard/DashboardBoxSkeleton.svelte';

	export let loading = true;
</script>

<div class="grid auto-rows-auto grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-5">
	<slot />
	{#if loading}
		{#each [...Array(10).keys()] as index (index)}
			<DashboardBoxSkeleton />
		{/each}
	{/if}
</div>
