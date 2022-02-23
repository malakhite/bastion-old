import { slugify } from './slugify';

describe('slugify', () => {
	it('base case', () => {
		const result = slugify('Antigua and Barbados');
		expect(result).toBe('antigua-and-barbados');
	});

	it('handles starting and trailing whitespace', () => {
		const result = slugify('   Antigua and Barbados ');
		expect(result).toBe('antigua-and-barbados');
	});

	it('handles whitespace besides single spaces', () => {
		const result = slugify('Antigua   and	Barbados');
		expect(result).toBe('antigua-and-barbados');
	});
});
