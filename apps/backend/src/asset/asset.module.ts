import { Module } from '@nestjs/common';
import { AssetService } from './asset.service';
import { AssetController } from './asset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asset } from './entities/asset.entity';
import { UserModule } from '../user/user.module';
import { S3Service } from './s3.service';

@Module({
	controllers: [AssetController],
	exports: [AssetService],
	imports: [TypeOrmModule.forFeature([Asset]), UserModule],
	providers: [AssetService, S3Service],
})
export class AssetModule {}
