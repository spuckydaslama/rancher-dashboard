<script lang="ts">
	import DashboardBoxSkeleton from '$lib/components/atoms/dashboard/DashboardBoxSkeleton.svelte';

	export let loading = true;
</script>

<div class="grid auto-rows-auto grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
	{#if loading}
		{#each [...Array(12).keys()] as index (index)}
			<DashboardBoxSkeleton />
		{/each}
	{:else}
		<slot />
	{/if}
</div>
