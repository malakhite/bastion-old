import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { PulsePointAgency } from './pulsepoint_agency.entity';
import { PulsePointIncidentType } from './pulsepoint_incident_type.entity';

@Entity({ name: 'pulsepoint_incidents' })
export class PulsePointIncident {
	@PrimaryColumn({ type: 'bigint' })
	id!: number;

	@ManyToOne(() => PulsePointAgency, (agency) => agency.agency_id)
	@JoinColumn({ name: 'agency_id' })
	agency!: PulsePointAgency;

	@Column({ type: 'numeric' })
	latitude!: number;

	@Column({ type: 'numeric' })
	longitude!: number;

	@Column({ type: 'boolean' })
	public!: boolean;

	@ManyToOne(() => PulsePointIncidentType)
	@JoinColumn({ name: 'incident_type' })
	incidentType!: PulsePointIncidentType;

	@Column({ type: 'timestamptz' })
	call_received!: Date;

	@Column({ type: 'timestamptz' })
	call_closed!: Date;

	@Column({ type: 'text' })
	address_full!: string;

	@Column({ type: 'text' })
	address_medical!: string;

	@Column({ type: 'boolean' })
	address_truncated!: boolean;

	@Column({ type: 'text', nullable: true })
	street_number?: string;

	@Column({ type: 'text', nullable: true })
	common_place_name?: string;
}
