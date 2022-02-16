<script>
	import IconStar from '$lib/components/atoms/icons/IconStar.svelte';
	export let value = false;
</script>

<button
	class="flex h-6 w-12 items-center rounded-full bg-gray-300 p-0.5 hover:text-amber-400"
	class:bg-gray-500={value}
	class:text-gray-600={!value}
	class:text-amber-500={value}
	on:click
>
	<span class="text-inherit transition" class:translate-x-5={value}>
		<IconStar class="h-6 w-6" />
	</span>
</button>
