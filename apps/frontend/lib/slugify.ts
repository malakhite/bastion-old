export default function slugify(s: string): string {
	const slug = s.toLowerCase().replaceAll(/\s+/, '-');
	return slug;
}
