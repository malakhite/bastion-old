import { ImageVariantType } from '../images/entities/image_variant_type.entity';

export const IMAGE_VARIANT_TYPES: ImageVariantType[] = [
	{
		id: 1,
		cf_variant_name: 'blob',
		cf_variant_description: 'The original image as uplaoded.',
	},
	{
		id: 2,
		cf_variant_name: 'public',
		cf_variant_description: 'The standard, high resolution image variant.',
	},
	{
		id: 3,
		cf_variant_name: 'thumbnail',
		cf_variant_description:
			'A smaller variant for previews and thumbnails.',
	},
];
