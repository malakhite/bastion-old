import { IsUrl } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity('assets')
export class Asset extends Base {
	@Column('varchar')
	key!: string;

	@IsUrl()
	@Column('varchar')
	url!: string;

	@Column({ type: 'varchar', nullable: true })
	alt_text: string | null = null;

	@Column({ type: 'integer', nullable: true })
	height: number | null = null;

	@Column({ type: 'integer', nullable: true })
	width: number | null = null;

	@ManyToOne(() => User, { eager: true })
	@JoinColumn({ name: 'author_id' })
	author!: User;
}
