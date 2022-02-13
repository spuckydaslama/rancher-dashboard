import type { ClusterType } from '$lib/types/ranchertypes';
import { localStoreWritable } from '$lib/stores/localStoreWritable';

export const favoriteClusters = localStoreWritable<ClusterType[]>('favoriteClusters', []);
