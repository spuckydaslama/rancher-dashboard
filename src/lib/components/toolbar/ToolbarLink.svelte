<script>
	import { page } from '$app/stores';
	export let href;
</script>

<a
	{href}
	class:text-amber-500={$page.url.pathname === href}
	class="h-6 w-6 transition hover:text-amber-400"
>
	<slot />
</a>
