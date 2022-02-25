import { Injectable, OnModuleInit } from '@nestjs/common';
import { FactbookService } from '@bastion/factbook';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService implements OnModuleInit {
	constructor(private factbookService: FactbookService) {}

	async onModuleInit() {
		await this.processCountries();
	}

	@Cron(CronExpression.EVERY_DAY_AT_2AM)
	async processCountries() {
		await this.factbookService.processCountries();
	}
}
