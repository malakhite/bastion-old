import { IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { PulsePointAgencyType } from './pulsepoint_agency_type.entity';

@Entity('pulsepoint_agencies')
export class PulsePointAgency {
	@IsUUID()
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'integer', unique: true })
	pulsepoint_id!: number;

	@Column({ type: 'text' })
	name!: string;

	@Column({ type: 'text' })
	initials!: string;

	@Column({ type: 'text' })
	description!: string;

	@Column({ type: 'integer' })
	agency_id!: number;

	@ManyToOne(() => PulsePointAgencyType, { eager: true })
	@JoinColumn({ name: 'agency_type_id' })
	agencyType!: PulsePointAgencyType;

	@Column({ type: 'text' })
	city!: string;

	@Column({ type: 'text' })
	state!: string;

	@Column({ type: 'text' })
	country!: string;

	@Column({ type: 'text' })
	latitude!: string;

	@Column({ type: ''})
}
