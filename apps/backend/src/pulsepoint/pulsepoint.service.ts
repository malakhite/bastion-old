import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';

@Injectable()
export class PulsePointService {
	constructor(
		@InjectQueue('pulsepoint')
		private pulsePointQueue: Queue,

		private configService: ConfigService,
		private httpService: HttpService,
	) {}

	async getAgencies() {}

	// async queueUpdate() {
	// 	await this.pulsePointQueue.add({})
	// }
}
