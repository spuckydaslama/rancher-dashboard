export const isUniquePredicate: <T>(
	fn?: (value: T) => any
) => (value: T, index: number, array: T[]) => boolean =
	(fn = (value) => value) =>
	(value, index, array) =>
		index === array.findIndex((otherValue) => fn(otherValue) === fn(value));
