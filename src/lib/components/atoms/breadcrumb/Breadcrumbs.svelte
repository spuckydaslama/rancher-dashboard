<script lang="ts">
	import type { Crumb } from './types';

	export let crumbs: Crumb[] = [];
</script>

<ul class="mx-2 flex">
	{#each crumbs as crumb, index (crumb.href)}
		<li>
			{#if index < crumbs.length - 1}
				<a href={crumb.href} class="hover:text-amber-500">{crumb.name}</a>
			{:else}
				{crumb.name}
			{/if}
		</li>
		<li class="mx-2 last:hidden">&gt;</li>
	{/each}
</ul>
