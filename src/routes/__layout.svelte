<script>
	import '../app.css';
	import MainToolbar from '$lib/components/toolbar/MainToolbar.svelte';
</script>

<svelte:head>
	<meta
		name="description"
		content="The dashboard helps you to quickly navigate to your favourite objects of a rancher cluster"
	/>
</svelte:head>

<div class="mt-2 lg:ml-16 lg:mr-16">
	<div class="mb-4">
		<MainToolbar />
	</div>
	<slot />
</div>
