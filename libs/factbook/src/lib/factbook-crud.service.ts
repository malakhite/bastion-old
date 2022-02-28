import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FactbookCountry } from './entities';

@Injectable()
export class FactbookCrudService {
	constructor(
		@InjectRepository(FactbookCountry)
		private countryRepository: Repository<FactbookCountry>,
	) {}

	public async findAll() {
		return this.countryRepository.find();
	}

	public async findOneById(id: string) {
		return this.countryRepository.find({
			where: { id },
			relations: [
				'fields',
				'fields.category',
				'fields.field_type',
				'region',
			],
		});
	}

	public async findOneBySlug(slug: string) {
		return this.countryRepository.find({
			where: { slug },
			relations: [
				'fields',
				'fields.category',
				'fields.field_type',
				'region',
			],
		});
	}
}
