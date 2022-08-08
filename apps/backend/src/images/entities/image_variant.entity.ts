import { IsUrl } from 'class-validator';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { ImageVariantType } from './image_variant_type.entity';

@Entity('image_variants')
export class ImageVariant {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@ManyToOne(() => ImageVariantType, { eager: true })
	@JoinColumn({ name: 'variant_type' })
	variant!: ImageVariantType;

	@ManyToOne(() => Image)
	@JoinColumn({ name: 'image_id' })
	image!: Image;

	@IsUrl()
	@Column('text')
	image_url!: string;
}
