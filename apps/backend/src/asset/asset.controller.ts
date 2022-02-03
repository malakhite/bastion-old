import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UploadedFile,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AssetService } from './asset.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';

@Controller({ path: 'asset', version: '1' })
export class AssetController {
	constructor(private readonly assetService: AssetService) {}

	@UseInterceptors(FileInterceptor('file'))
	@Post()
	create(
		@Body() createAssetDto: CreateAssetDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return this.assetService.create(createAssetDto, file);
	}

	@Get()
	findAll() {
		return this.assetService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.assetService.findOne(id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
		return this.assetService.update(id, updateAssetDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.assetService.remove(id);
	}
}
