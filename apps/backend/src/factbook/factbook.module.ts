import { Module } from '@nestjs/common';

import { FactbookModule as FactbookBaseModule } from '@bastion/factbook';
import { FactbookController } from './factbook.controller';

@Module({
	controllers: [FactbookController],
	imports: [FactbookBaseModule],
	providers: [],
})
export class FactbookModule {}
