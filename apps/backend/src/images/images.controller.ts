import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Get,
	Logger,
	Param,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Roles } from '../auth/decorators/roles.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '../user/entities/user.entity';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { ImageService } from './images.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller({ path: 'images', version: '1' })
export class ImageController {
	private readonly logger = new Logger(ImageController.name);
	constructor(private imageService: ImageService) {}

	@UseInterceptors(FileInterceptor('file'))
	@UseGuards(JwtAuthGuard)
	@Roles(Role.ADMIN)
	@Post()
	async create(
		@Body() createImageDto: CreateImageDto,
		@UploadedFile() file: Express.Multer.File,
	) {
		return await this.imageService.upload(file, createImageDto);
	}

	@Get()
	async find(): Promise<Image[]> {
		return await this.imageService.find();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Image | null> {
		return await this.imageService.findOne(id);
	}
}
