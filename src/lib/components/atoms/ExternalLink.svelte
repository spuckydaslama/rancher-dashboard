<script lang="ts">
	import IconExternalLink from '$lib/components/atoms/icons/IconExternalLink.svelte';

	export let href: string;
</script>

<a target="_blank" {href} class="text-gray-500 hover:underline">
	<span class="inline-flex items-center gap-0.5">
		<slot />
		<IconExternalLink class="inline h-4 w-4" />
	</span>
</a>
