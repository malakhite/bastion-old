import { ISession } from 'connect-typeorm/out';
import {
	Column,
	DeleteDateColumn,
	Entity,
	Index,
	PrimaryColumn,
} from 'typeorm';

@Entity()
export class Session implements ISession {
	@Index()
	@Column({ type: 'numeric', name: 'expired_at' })
	public expiredAt = Date.now();

	@PrimaryColumn({ type: 'text' })
	public id!: string;

	@Column({ type: 'jsonb' })
	public json!: string;

	@DeleteDateColumn({ name: 'destroyed_at', type: 'timestamptz' })
	public destroyedAt?: Date;
}
