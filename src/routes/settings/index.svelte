<script lang="ts">
	import { authToken } from '$lib/stores/settings';
	import { rancherUrl } from '$lib/stores/settings';
</script>

<div class="m-2 ml-8 mr-8 flex flex-col gap-2">
	<div class="flex items-center gap-1">
		<label for="authToken" class="after:content-['_*']">Auth Token</label>
		<input
			id="authToken"
			name="authToken"
			type="text"
			bind:value={$authToken}
			class="grow rounded border-2"
			class:border-rose-500={!$authToken}
		/>
	</div>
	<div class="flex items-center gap-1">
		<label for="rancherUrl" class="after:content-['_*']">Rancher Url</label>
		<input
			id="rancherUrl"
			name="rancherUrl"
			type="text"
			bind:value={$rancherUrl}
			class="grow rounded border-2"
			class:border-rose-500={!$rancherUrl}
		/>
	</div>
</div>
