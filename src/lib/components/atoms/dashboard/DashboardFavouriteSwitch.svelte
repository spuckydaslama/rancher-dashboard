<script>
	import IconStarOutline from '$lib/components/atoms/icons/IconStarOutline.svelte';
	import IconStar from '$lib/components/atoms/icons/IconStar.svelte';

	export let value = false;
</script>

<button class={$$props.class} on:click>
	{#if value}
		<IconStar class="text-amber-500" />
	{:else}
		<IconStarOutline class="text-gray-600" />
	{/if}
</button>
