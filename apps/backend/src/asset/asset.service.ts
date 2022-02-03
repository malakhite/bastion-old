import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
import { Asset } from './entities/asset.entity';
import { S3Service } from './s3.service';

@Injectable()
export class AssetService {
	constructor(
		@InjectRepository(Asset)
		private assetRepository: Repository<Asset>,
		private s3Service: S3Service,
		private userService: UserService,
	) {}

	async create(
		createAssetDto: CreateAssetDto,
		file: Express.Multer.File,
	): Promise<Asset> {
		const uploadResult = await this.s3Service.uploadFile(
			file.buffer,
			createAssetDto.filename,
		);
		const asset = await this.assetRepository.create({
			...createAssetDto,
			url: `https://cdn.scottabbey.com/${uploadResult}`,
			key: uploadResult,
		});
		const author = await this.userService.findOne(createAssetDto.author_id);
		if (author) {
			asset.author = author;
		} else {
			throw new BadRequestException(
				`Author is required. Unable to find author with id ${createAssetDto.author_id}`,
			);
		}

		return await this.assetRepository.save(asset);
	}

	async findAll(take?: number, skip?: number): Promise<Asset[]> {
		if (take && skip) {
			return await this.assetRepository.find({ skip, take });
		}

		return await this.assetRepository.find();
	}

	async findOne(id: string): Promise<Asset | undefined> {
		return await this.assetRepository.findOne(id);
	}

	async update(
		id: string,
		updateAssetDto: UpdateAssetDto,
	): Promise<Asset | undefined> {
		await this.assetRepository.update(id, updateAssetDto);
		return await this.findOne(id);
	}

	async remove(id: string): Promise<void> {
		const result = await this.assetRepository.softDelete(id);
		if (result.affected === 0) {
			throw new NotFoundException(`Asset with id ${id} not found`);
		}
	}
}
