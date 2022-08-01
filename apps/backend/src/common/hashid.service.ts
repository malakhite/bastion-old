import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Hashids from 'hashids';

@Injectable()
export class HashidService {
	private hashid: Hashids;

	constructor(configService: ConfigService) {
		this.hashid = new Hashids(
			configService.get('HASHID_SALT'),
			configService.get('HASHID_MIN_LENGTH'),
		);
	}

	public encode(id: number) {
		return this.hashid.encode(id);
	}

	public decode(id: string) {
		return this.hashid.decode(id)[0].valueOf() as number;
	}
}
