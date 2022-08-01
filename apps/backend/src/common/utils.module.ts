import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HashidService } from './hashid.service';

@Module({
	providers: [HashidService],
	imports: [ConfigModule],
})
export class UtilsModule {}
