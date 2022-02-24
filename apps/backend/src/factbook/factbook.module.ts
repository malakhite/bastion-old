import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FactbookService } from './factbook.service';
import { FactbookCountry } from './entities/country.entity';
import {
	FactbookCategory,
	FactbookField,
	FactbookFieldType,
} from './entities/field.entity';
import { FactbookRegion } from './entities/region.entity';

@Module({
	controllers: [],
	exports: [],
	imports: [
		HttpModule.register({
			baseURL: 'https://www.cia.gov/the-world-factbook/page-data',
			headers: {
				accept: 'application/json',
			},
		}),
		TypeOrmModule.forFeature([
			FactbookCategory,
			FactbookCountry,
			FactbookField,
			FactbookFieldType,
			FactbookRegion,
		]),
	],
	providers: [FactbookService],
})
export class FactbookModule {}
