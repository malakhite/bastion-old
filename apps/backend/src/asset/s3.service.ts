import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

@Injectable()
export class S3Service {
	constructor(private configService: ConfigService) {}

	async uploadFile(dataBuffer: Buffer, filename: string) {
		const Key = `${uuid()}-${filename}`;
		try {
			const client = new S3Client({ region: 'us-east-1' });
			const uploadResult = await client.send(
				new PutObjectCommand({
					Bucket: this.configService.get('aws.bucket_name'),
					Key,
					Body: dataBuffer,
				}),
			);
			console.log(uploadResult);

			return Key;
		} catch (maybeError) {
			throw new BadRequestException(maybeError);
		}
	}
}
