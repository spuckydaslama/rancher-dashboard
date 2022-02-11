<script lang="ts">
	import type { ClusterType } from '$lib/types/ranchertypes';
	import DashboardBox from '$lib/components/atoms/dashboard/DashboardBox.svelte';
	import DashboardBoxName from '$lib/components/atoms/dashboard/DashboardBoxName.svelte';
	import LinkToRancherCluster from '$lib/components/clusters/LinkToRancherCluster.svelte';

	export let cluster: ClusterType;
</script>

<DashboardBox href="/clusters/{cluster.id}">
	<div>
		<DashboardBoxName>{cluster.name}</DashboardBoxName>
	</div>
	<div>
		<LinkToRancherCluster clusterId={cluster.id}>zum Rancher</LinkToRancherCluster>
	</div>
</DashboardBox>
