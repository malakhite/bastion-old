import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PulsePointCity {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column({ type: 'text' })
	city!: string;

	@Column({ type: 'text' })
	region!: string;

	@Column({ type: 'text' })
	country!: string;
}
