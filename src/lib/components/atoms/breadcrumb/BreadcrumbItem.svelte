<script lang="ts">
	import type { Crumb } from './types';

	export let crumbs: Crumb[] = [];
</script>

<ul class="mx-2 flex">
	{#each crumbs as crumb (crumb.href)}
		<li><a href={crumb.href} class="hover:text-amber-500">{crumb.name}</a></li>
		<li class="mx-2 last:hidden">&gt;</li>
	{/each}
</ul>
