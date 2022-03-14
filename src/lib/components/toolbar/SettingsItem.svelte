<script lang="ts">
	import IconCog from '$lib/components/atoms/icons/IconCog.svelte';
	import ToolbarLink from '$lib/components/toolbar/ToolbarLink.svelte';

	export let href: string;
	export let ping = false;
</script>

<ToolbarLink {href}>
	<span class="relative">
		<IconCog class="-mt-0.5 inline-flex" />
		{#if ping}
			<span class="absolute top-0 right-0 flex h-2.5 w-2.5">
				<span
					class="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"
				/>
				<span class="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-500" />
			</span>
		{/if}
	</span>
</ToolbarLink>
