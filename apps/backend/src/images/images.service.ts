import { HttpService } from '@nestjs/axios';
import {
	Injectable,
	InternalServerErrorException,
	Logger,
	OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { HashidService } from '../common/hashid.service';
import { IMAGE_VARIANT_TYPES } from '../config/constants';
import { UserService } from '../user/user.service';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { ImageVariant } from './entities/image_variant.entity';
import { ImageVariantType } from './entities/image_variant_type.entity';
import { ICloudflareImageResponse } from './interfaces/ICloudflareImageResponse';

@Injectable()
export class ImageService implements OnApplicationBootstrap {
	private readonly logger = new Logger(ImageService.name);
	private cloudflareAccount: string;
	private cloudflareDeliveryId: string;
	private cloudflareToken: string;
	private cloudflareApiRoot: string;
	public imageVariantTypes?: ImageVariantType[];

	constructor(
		@InjectRepository(Image)
		private imageRepository: Repository<Image>,
		@InjectRepository(ImageVariant)
		private imageVariantRepository: Repository<ImageVariant>,
		@InjectRepository(ImageVariantType)
		private imageVariantTypeRepository: Repository<ImageVariantType>,
		private configService: ConfigService,
		private httpService: HttpService,
		private userService: UserService,
	) {
		/* eslint-disable @typescript-eslint/no-non-null-assertion */
		this.cloudflareAccount = this.configService.get('CF_IMAGES_ID')!;
		this.cloudflareToken = this.configService.get('CF_IMAGES_KEY')!;
		this.cloudflareDeliveryId = this.configService.get(
			'CF_IMAGES_DELIVERY_ID',
		)!;
		this.cloudflareApiRoot = `https://api.cloudflare.com/client/v4/accounts/${this.cloudflareAccount}/images/v1`;
		/* eslint-enable @typescript-eslint/no-non-null-assertion */
	}

	async upload(file: Express.Multer.File, createImageDto: CreateImageDto) {
		if (!this.imageVariantTypes?.length) {
			throw new InternalServerErrorException(
				`imageVariantTypes was not set.`,
			);
		}

		const { data } = await lastValueFrom(
			await this.httpService.request<ICloudflareImageResponse>({
				method: 'post',
				url: this.cloudflareApiRoot,
				data: { file: file.buffer },
				headers: {
					Authorization: `Bearer ${this.cloudflareToken}`,
					'Content-Type': 'multipart/form-data',
				},
				maxBodyLength: Infinity,
			}),
		);

		if (!data.success) {
			throw new InternalServerErrorException(
				`Unable to upload image: ${data.errors}`,
			);
		}
		const owner = await this.userService.findOneById(
			createImageDto.owner_id,
		);
		const variants: ImageVariant[] = await Promise.all(
			data.result.variants.map(async (dataVariant) => {
				const variant = new ImageVariant();
				const dataVariantType = dataVariant.split('/').pop();
				if (!dataVariantType) {
					throw new InternalServerErrorException(
						`Unable to determine image variant type from variant ${dataVariant}`,
					);
				}

				if (!this.imageVariantTypes?.length) {
					throw new InternalServerErrorException(
						`imageVariantTypes was not set.`,
					);
				}

				const variantType = this.imageVariantTypes.find(
					(imageVariantType) =>
						imageVariantType.cf_variant_name === dataVariantType,
				);
				if (!variantType) {
					throw new InternalServerErrorException(
						`variantType ${dataVariantType} was not found.`,
					);
				}
				variant.image_url = dataVariant;
				variant.variant = variantType;
				return variant;
			}),
		);

		const blob = new ImageVariant();
		blob.variant = this.imageVariantTypes[0];
		blob.image_url = `https://imagedelivery.net/${this.cloudflareDeliveryId}/${data.result.id}/blob`;
		variants.push(blob);

		const image = new Image();
		image.id = data.result.id;
		image.alt_text = createImageDto.alt_text;
		image.attribution = createImageDto.attribution;
		image.file_name = file.originalname;
		image.owner = owner;
		const savedImage = await this.imageRepository.save(image);

		await Promise.all(
			variants.map(async (variant) => {
				variant.image = savedImage;
				return await this.imageVariantRepository.save(variant);
			}),
		);

		return await this.imageRepository.findOneOrFail({
			where: { id: image.id },
			relations: { owner: true, variants: true },
		});
	}

	async find(): Promise<Image[]> {
		return await this.imageRepository.find();
	}

	async findOne(id: string): Promise<Image | null> {
		const image = await this.imageRepository.findOne({
			where: { id },
			relations: { owner: true, variants: true },
		});

		return image;
	}

	async onApplicationBootstrap() {
		const variantTypes = await this.imageVariantTypeRepository.count();
		if (variantTypes !== IMAGE_VARIANT_TYPES.length) {
			await this.imageVariantTypeRepository.upsert(IMAGE_VARIANT_TYPES, [
				'id',
			]);
		}
		this.imageVariantTypes = await this.imageVariantTypeRepository.find();
	}
}
