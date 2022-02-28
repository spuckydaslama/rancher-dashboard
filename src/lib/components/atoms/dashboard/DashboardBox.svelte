<script lang="ts">
	import type { ColorMode } from '$lib/components/atoms/dashboard/colorModes';
	import { colorModes } from '$lib/components/atoms/dashboard/colorModes';

	export let href: string | undefined = undefined;
	export let colorMode: ColorMode = colorModes.info;
</script>

<a {href} class={'relative rounded-md border p-1 shadow ' + colorMode.classes}>
	<slot />
</a>
