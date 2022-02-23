import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountryDataService } from './country-data.service';
import { Country } from './entities/country.entity';
import { Category, Field } from './entities/field.entity';
import { Region } from './entities/region.entity';
import { FactbookUpdate } from './entities/update.entity';

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
			Country,
			Field,
			Region,
			Category,
			FactbookUpdate,
		]),
	],
	providers: [CountryDataService],
})
export class CountryDataModule {}
