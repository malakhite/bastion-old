import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
	imports: [
		BullModule.registerQueue({
			name: 'pulsepoint',
		}),
	],
	controllers: [],
	providers: [],
})
export class PulsePointModule {}
