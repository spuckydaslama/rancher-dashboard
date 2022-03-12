<script lang="ts">
	import DashboardToolbar from '$lib/components/atoms/dashboardToolbar/DashboardToolbar.svelte';
	import FavoritesSwitch from '$lib/components/toolbar/FavoritesSwitch.svelte';
	import {
		getFavoriteCluster,
		getFavoriteProject,
		showOnlyFavourites
	} from '$lib/stores/favorites';
	import SettingsItem from '$lib/components/toolbar/SettingsItem.svelte';
	import HomeItem from '$lib/components/toolbar/HomeItem.svelte';
	import type { Crumb } from '$lib/components/atoms/breadcrumb/types';
	import { pathToProjects, pathToSettings, pathToWorkloads } from '$lib/paths';
	import { page } from '$app/stores';
	import { getCluster, getProject } from '$lib/api/localApiClient';
	import type { ClusterType, ProjectType } from '$lib/types/ranchertypes';
	import type { FavoriteCluster, FavoriteProject } from '$lib/types/favoritetypes';
	import { browser } from '$app/env';
	import Breadcrumbs from '$lib/components/atoms/breadcrumb/Breadcrumbs.svelte';
	import ClustersItem from '$lib/components/toolbar/ClustersItem.svelte';
	import { authToken, rancherUrl } from '$lib/stores/settings';

	const favoritesSwitchClicked = () => {
		$showOnlyFavourites = !$showOnlyFavourites;
	};

	let crumbs: Crumb[];
	const updateCrumbs = async (clusterId?: string, projectId?: string) => {
		const crumbObjects: PromiseLike<Crumb>[] = [];
		if (clusterId) {
			const favoriteCluster = getFavoriteCluster(clusterId);
			const cluster: PromiseLike<ClusterType | FavoriteCluster> = favoriteCluster
				? Promise.resolve(favoriteCluster)
				: getCluster(clusterId);
			crumbObjects.push(
				cluster.then((cluster) => ({
					name: cluster.name,
					href: pathToProjects(clusterId)
				}))
			);
		}

		if (projectId) {
			const favoriteProject = getFavoriteProject(clusterId, projectId);
			const project: PromiseLike<ProjectType | FavoriteProject> = favoriteProject
				? Promise.resolve(favoriteProject)
				: getProject(projectId);
			crumbObjects.push(
				project.then((project) => ({
					name: project.name,
					href: pathToWorkloads(clusterId, projectId)
				}))
			);
		}

		crumbs = (await Promise.all(crumbObjects)).filter((e) => !!e);
	};

	$: if ($page.params.clusterId || $page.params.projectId) {
		if (browser) {
			updateCrumbs($page.params.clusterId, $page.params.projectId);
		}
	}

	let pingSettingItem: boolean;
	$: pingSettingItem = !($rancherUrl && $authToken);
</script>

<DashboardToolbar>
	<svelte:fragment slot="main">
		<HomeItem />
		<ClustersItem />
		<Breadcrumbs {crumbs} />
	</svelte:fragment>
	<svelte:fragment slot="side">
		<FavoritesSwitch value={$showOnlyFavourites} on:click={favoritesSwitchClicked} />
		<SettingsItem href={pathToSettings} ping={pingSettingItem} />
	</svelte:fragment>
</DashboardToolbar>
