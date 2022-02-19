<script lang="ts">
	export let href: string;
</script>

<a {href} class="relative h-16 rounded-md border bg-sky-300 p-1 shadow hover:bg-sky-400">
	<slot />
</a>
