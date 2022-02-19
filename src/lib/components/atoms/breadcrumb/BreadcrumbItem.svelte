<script lang="ts">
	import type { Crumb } from './types';

	export let crumbs: Crumb[];
	console.log(crumbs);
</script>

<ul class="flex">
	{#each crumbs as crumb (crumb.href)}
		<li><a href={crumb.href}>{crumb.name}</a></li>
		<li class="mx-2 last:hidden">&gt;</li>
	{/each}
</ul>
