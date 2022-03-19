import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PulsePointAgency } from './pulsepoint_agency.entity';

@Entity('pulsepoint_media')
export class PulsePointMedia {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'text' })
	url!: string;

	@Column({ type: 'text' })
	name!: string;

	@Column({ type: 'text' })
	description!: string;

	@ManyToOne(() => PulsePointAgency)
	@JoinColumn({ name: 'agency_id' })
	agency!: PulsePointAgency;
}
