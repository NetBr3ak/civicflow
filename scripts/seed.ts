import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	await prisma.report.deleteMany({});
	console.log('Cleared all reports');

	const reports = await prisma.report.createMany({
		data: [
			{
				name: 'John Smith',
				email: 'john.smith@email.com',
				category: 'Infrastructure',
				message: 'The main bridge on Oak Street has several broken panels and needs immediate repair. This poses a safety risk for pedestrians and cyclists.',
				priority: 'high',
			},
			{
				name: 'Sarah Johnson',
				email: 'sarah.j@email.com',
				category: 'Environmental',
				message: 'Illegal dumping has been observed near the riverside park. Multiple bags of waste have accumulated over the past week.',
				priority: 'normal',
			},
			{
				name: 'Michael Chen',
				email: 'm.chen@email.com',
				category: 'Public Safety',
				message: 'Street lights on Maple Avenue have been non-functional for three days, making the area unsafe during evening hours.',
				priority: 'high',
			},
		],
	});

	console.log(`Created ${reports.count} sample reports`);
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
