import { IsDate } from 'class-validator';
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryColumn,
	UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ImageVariant } from './image_variant.entity';

@Entity('images')
export class Image {
	@PrimaryColumn('uuid')
	id!: string;

	@Column('text')
	file_name!: string;

	@Column('text')
	attribution?: string;

	@Column({ type: 'text', nullable: true })
	alt_text?: string | null;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({ name: 'owner_id' })
	owner!: User;

	@IsDate()
	@CreateDateColumn({ type: 'timestamptz' })
	created_at!: Date;

	@IsDate()
	@UpdateDateColumn({ type: 'timestamptz', nullable: true })
	updated_at?: Date | null;

	@OneToMany(() => ImageVariant, (variant) => variant.image, {
		eager: true,
		cascade: true,
	})
	variants!: ImageVariant[];
}
