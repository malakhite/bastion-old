import { sleep } from './sleep';

describe('sleep()', () => {
	afterEach(() => {
		jest.useRealTimers();
	});

	it('should work', () => {
		expect.assertions(2);
		jest.useFakeTimers();
		jest.spyOn(global, 'setTimeout');
		const pendingPromise = sleep(1000).then(() => {
			expect(setTimeout).toHaveBeenCalledTimes(1);
			expect(setTimeout).toHaveBeenLastCalledWith(
				expect.any(Function),
				1000,
			);
		});
		jest.runAllTimers();
		return pendingPromise;
	});
});
