import { nullify } from './nullify';

describe('nullify()', () => {
	it('works for strings', () => {
		const result = nullify('--');
		expect(result).toBe(null);
		const passedThrough = nullify('test');
		expect(passedThrough).toBe('test');
	});

	it('works for NaN', () => {
		const result = nullify(NaN);
		expect(result).toBeNull();
	});

	it('works for null', () => {
		const result = nullify(null);
		expect(result).toBeNull();
	});
});
