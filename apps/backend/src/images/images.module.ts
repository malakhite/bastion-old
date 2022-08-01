import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsModule } from '../common/utils.module';
import { UserModule } from '../user/user.module';
import { Image } from './entities/image.entity';
import { ImageVariant } from './entities/image_variant.entity';
import { ImageVariantType } from './entities/image_variant_type.entity';
import { ImageController } from './images.controller';
import { ImageService } from './images.service';

@Module({
	controllers: [ImageController],
	exports: [ImageService],
	imports: [
		HttpModule,
		TypeOrmModule.forFeature([Image, ImageVariant, ImageVariantType]),
		UserModule,
	],
	providers: [ImageService],
})
export class ImageModule {}
