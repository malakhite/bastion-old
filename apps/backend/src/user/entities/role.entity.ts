import { Exclude } from 'class-transformer';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column({
		type: 'text',
		update: false,
		transformer: {
			to: (value: string) => value.toLowerCase().trim(),
			from: (value) => value,
		},
	})
	@Index({ unique: true })
	name!: string;

	@Exclude()
	@Column({ type: 'text' })
	description!: string;

	constructor(role: Role) {
		Object.assign(this, role);
	}
}
