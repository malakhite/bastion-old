import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PulsePointAgency } from './pulsepoint_agency.entity';

@Entity({ name: 'pulsepoint_units' })
export class PulsePointUnit {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'text' })
	designator!: string;

	@ManyToOne(() => PulsePointAgency)
	@JoinColumn({ name: 'agency_id' })
	agency!: PulsePointAgency;
}
