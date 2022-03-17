import {
	ClassSerializerInterceptor,
	Controller,
	Get,
	Param,
	UseInterceptors,
} from '@nestjs/common';
import { FactbookCrudService } from '@bastion/factbook';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'api/factbook', version: '1' })
export class FactbookController {
	constructor(private readonly factbookService: FactbookCrudService) {}

	@Get('country')
	async findAll() {
		return await this.factbookService.findAll();
	}

	@Get('country/slug/:slug')
	async findBySlug(@Param('slug') slug: string) {
		return await this.factbookService.findOneBySlug(slug);
	}

	@Get('country/:id')
	async findById(@Param('id') id: string) {
		return await this.factbookService.findOneById(id);
	}
}
