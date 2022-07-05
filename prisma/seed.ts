import { Prisma, PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

// const userData: Prisma.UserCreateInput[] = [];

// const envMap = {
// 	email: 'OWNER_EMAIL',
// 	name: 'OWNER_NAME',
// 	password: 'OWNER_PASSWORD',
// }

async function main() {
	console.log('Start seeding...');

	if (!process.env.OWNER_EMAIL) {
		throw new Error('OWNER_EMAIL not set');
	}
	if (!process.env.OWNER_NAME) {
		throw new Error('OWNER_NAME not set');
	}
	if (!process.env.OWNER_PASSWORD) {
		throw new Error('OWNER_PASSWORD not set');
	}

	const newOwner: Prisma.UserCreateInput = {
		email: process.env.OWNER_EMAIL,
		name: process.env.OWNER_NAME,
		password: await argon2.hash(process.env.OWNER_PASSWORD),
		active: true,
	};

	const owner = await prisma.user.create({ data: newOwner });

	console.log(`Created owner user with id: ${owner.id}`);
}

main()
	.catch((error) => {
		console.error(error);
		process.exit(1);
	})
	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	.finally(async () => await prisma.$disconnect());
