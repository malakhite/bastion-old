import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'pulsepoint_incident_types' })
export class PulsePointIncidentType {
	@PrimaryGeneratedColumn('identity')
	id!: number;

	@Column({ type: 'text', unique: true })
	code!: string;

	@Column({ type: 'text' })
	description!: string;
}
