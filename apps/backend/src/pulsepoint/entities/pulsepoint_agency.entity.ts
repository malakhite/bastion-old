import { IsUUID } from 'class-validator';
import {
	Column,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

import type { Point, Polygon } from 'geojson';

import { PulsePointAgencyType } from './pulsepoint_agency_type.entity';
import { PulsePointCity } from './pulsepoint_city.entity';
import { PulsePointMedia } from './pulsepoint_media.entity';

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
	short_name!: string;

	@Column({ type: 'text' })
	initials!: string;

	@Column({ type: 'text' })
	description!: string;

	@Column({ type: 'text', unique: true })
	agency_id!: string;

	@ManyToOne(() => PulsePointAgencyType, { eager: true })
	@JoinColumn({ name: 'agency_type_id' })
	agencyType!: PulsePointAgencyType;

	@Column({ type: 'text' })
	city!: string;

	@Column({ type: 'text' })
	state!: string;

	@Column({ type: 'text' })
	country!: string;

	@Column({ type: 'numeric' })
	latitude!: number;

	@Column({ type: 'numeric' })
	longitude!: number;

	@Column({ type: 'text' })
	timezone!: string;

	@Column({ type: 'integer' })
	psap!: number;

	@Column({ type: 'text', nullable: true })
	twitter_name?: string;

	@Column({ type: 'text', nullable: true })
	facebook_name?: string;

	@Column({ type: 'text', nullable: true })
	instagram_name?: string;

	@Column({ type: 'text', nullable: true })
	linkedin_name?: string;

	@Column({ type: 'text', nullable: true })
	youtube_url?: string;

	@Column({ type: 'text', nullable: true })
	email?: string;

	@Column({ type: 'text', nullable: true })
	website?: string;

	@Column({ type: 'text', nullable: true })
	livestream?: string;

	@Column({ type: 'boolean' })
	cpr_only!: boolean;

	@Column({ type: 'integer' })
	ogr_fid!: number;

	@Column({ type: 'polygon' })
	boundary!: Polygon;

	@Column({ type: 'point' })
	centroid!: Point;

	@Column({ type: 'text' })
	image!: string;

	@Column({ type: 'text' })
	splashscreen!: string;

	@Column({ type: 'boolean' })
	has_unit_legend!: boolean;

	@ManyToMany(() => PulsePointCity, { eager: true })
	@JoinTable()
	cities_served!: PulsePointCity[];

	@OneToMany(() => PulsePointMedia, (media) => media.agency, { eager: true })
	live_radio!: PulsePointMedia[];
}
