import * as argon2 from 'argon2';
import {
	EventSubscriber,
	EntitySubscriberInterface,
	InsertEvent,
	UpdateEvent,
} from 'typeorm';
import { User } from './user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
	listenTo() {
		return User;
	}

	async beforeInsert({ entity }: InsertEvent<User>): Promise<void> {
		entity.password = await argon2.hash(entity.password);
	}

	async beforeUpdate({
		entity,
		databaseEntity,
	}: UpdateEvent<User>): Promise<void> {
		if (
			entity?.password &&
			!(await argon2.verify(databaseEntity.password, entity.password))
		) {
			(entity as Partial<User>).password = await argon2.hash(
				entity.password,
			);
		} else if (entity?.password) {
			(entity as Partial<User>).password = databaseEntity.password;
		}
	}
}
