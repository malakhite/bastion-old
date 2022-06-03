import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('image_variant_types')
export class ImageVariantType {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column('text')
	cf_variant_name!: string;

	@Column('text')
	cf_variant_description!: string;
}
