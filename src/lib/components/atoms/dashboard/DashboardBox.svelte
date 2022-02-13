<script lang="ts">
	export let href: string;
</script>

<a {href} class="relative rounded-md border bg-sky-300 p-1 hover:bg-sky-400">
	<slot />
</a>
