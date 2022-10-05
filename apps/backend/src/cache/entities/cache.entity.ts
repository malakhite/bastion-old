import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'cache' })
export class Cache {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	// @OneToOne(() => Session, (session) => session.id)
	// @JoinColumn({ name: 'session_id' })
	// session!: Session;
	@Column({
		name: 'session_id',
		type: 'text',
		unique: true,
	})
	sessionId!: string;

	@Column({
		name: 'cache_data',
		type: 'jsonb',
	})
	cacheData!: unknown;
}
