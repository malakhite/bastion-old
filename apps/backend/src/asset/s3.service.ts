import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
	constructor(private configService: ConfigService) {}

	async uploadFile(dataBuffer: Buffer, filename: string) {
		const Key = `${uuid()}-${filename}`;
		const client = new S3Client({ region: 'us-east-1' });
		const uploadResult = await client.send(
			new PutObjectCommand({
				Bucket: this.configService.get('s3.bucket_name'),
				Key,
				Body: dataBuffer,
			}),
		);

		return Key;
	}
}
