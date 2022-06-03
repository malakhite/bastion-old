export class CreateImageDto {
	attribution?: string;
	alt_text?: string;
	height?: number;
	width?: number;
	owner_id!: string;
}
