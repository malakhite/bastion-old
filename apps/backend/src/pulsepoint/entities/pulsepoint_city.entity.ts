import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PulsePointCity {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'text' })
	city!: string;

	@Column({ type: 'text' })
	region!: string;

	@Column({ type: 'text' })
	country!: string;
}
