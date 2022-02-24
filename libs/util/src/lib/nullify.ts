const excludeValues: unknown[] = ['-', '--', 'null', 'undefined', 'false'];

export function nullify<T>(input: T): T | null {
	if (excludeValues.includes(input)) {
		return null;
	}
	if (Number.isNaN(input)) {
		return null;
	}
	return input;
}
