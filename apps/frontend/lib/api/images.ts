import { UserResponse } from './users';

export interface ImageVariantType {
	id: number;
	cf_variant_name: string;
	cf_variant_description: string;
}

export interface ImageVariant {
	id: number;
	variant: ImageVariantType;
	image_url: string;
}

export interface ImageResponse {
	id: string;
	file_name: string;
	attribution: string | null;
	alt_text: string | null;
	owner: UserResponse;
	created_at: string;
	updated_at?: string;
	variants: ImageVariant[];
}
