import type { Writable } from 'svelte/store';
import { browser } from '$app/env';
import { writable } from 'svelte/store';

export const localStoreWritable: <T>(key: string, defaultInitialValue: T) => Writable<T> = (
	key,
	defaultInitialValue
) => {
	const initialValue = browser
		? JSON.parse(localStorage.getItem(key)) || defaultInitialValue
		: defaultInitialValue;
	const store = writable(initialValue);
	store.subscribe((value) => {
		if (browser) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});
	return store;
};
