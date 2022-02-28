import { Module } from '@nestjs/common';

import { FactbookModule as FactbookBaseModule } from '@bastion/factbook';

@Module({
	controllers: [],
	imports: [FactbookBaseModule],
	providers: [],
})
export class FactbookModule {}
