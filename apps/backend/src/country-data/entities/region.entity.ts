import { Column, Entity } from 'typeorm';
import { Base } from '../../common/entities/base.entity';

@Entity()
export class Region extends Base {
	@Column({ type: 'varchar' })
	name!: string;
}
