<script>
	import ToolbarLink from '$lib/components/toolbar/ToolbarLink.svelte';
	import { pathToClusters } from '$lib/paths';
	import IconCubeTransparent from '$lib/components/atoms/icons/IconCubeTransparent.svelte';
	const href = pathToClusters;
</script>

<ToolbarLink {href}>
	<IconCubeTransparent />
</ToolbarLink>
