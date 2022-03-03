/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ISession } from 'connect-typeorm';
import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
export class Session implements ISession {
	@Index()
	@Column({ type: 'bigint' })
	public expiredAt: number = Date.now();

	@PrimaryColumn({ type: 'text' })
	public id: string = '';

	@Column({ type: 'jsonb' })
	public json: string = '';
}
