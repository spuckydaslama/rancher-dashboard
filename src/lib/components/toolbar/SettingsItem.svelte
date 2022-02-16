<script lang="ts">
	import IconCog from '$lib/components/atoms/icons/IconCog.svelte';
	import ToolbarLink from '$lib/components/toolbar/ToolbarLink.svelte';

	export let href: string;
</script>

<ToolbarLink {href}>
	<IconCog />
</ToolbarLink>
