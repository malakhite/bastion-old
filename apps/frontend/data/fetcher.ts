export default function fetcher<Res>(
	input: string,
	init: RequestInit = { headers: { 'content-type': 'application/json' } },
) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL;
	if (!baseUrl) {
		throw new Error('API_URL is not set');
	}

	return fetch(`${baseUrl}${input}`, init).then(
		(res) => res.json() as Promise<Res>,
	);
}
