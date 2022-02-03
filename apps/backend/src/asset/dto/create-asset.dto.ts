export class CreateAssetDto {
	filename!: string;
	alt_text?: string;
	height?: number;
	width?: number;
	author_id!: string;
}
