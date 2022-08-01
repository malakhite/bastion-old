import { IsInt } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pulsepoint_agency_types')
export class PulsePointAgencyType {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column({ type: 'text', unique: true })
	type!: string;
}
