import { prisma } from '../lib/prisma';

async function main() {
	await prisma.report.deleteMany({});
	console.log('Cleared all reports');

	await prisma.report.create({
		data: {
			name: 'John Smith',
			email: 'john.smith@email.com',
			category: 'Infrastructure',
			message: 'The main bridge on Oak Street has several broken panels and needs immediate repair. This poses a safety risk for pedestrians and cyclists.',
			priority: 'high',
			status: 'pending',
			createdAt: new Date('2025-10-08T10:30:00'),
		},
	});

	await prisma.report.create({
		data: {
			name: 'Sarah Johnson',
			email: 'sarah.j@email.com',
			category: 'Environmental',
			message: 'Illegal dumping has been observed near the riverside park. Multiple bags of waste have accumulated over the past week.',
			priority: 'normal',
			status: 'in-progress',
			createdAt: new Date('2025-10-07T14:15:00'),
		},
	});

	await prisma.report.create({
		data: {
			name: 'Michael Chen',
			email: 'm.chen@email.com',
			category: 'Public Safety',
			message: 'Street lights on Maple Avenue have been non-functional for three days, making the area unsafe during evening hours.',
			priority: 'high',
			status: 'resolved',
			createdAt: new Date('2025-10-06T09:45:00'),
		},
	});

	console.log('Created 3 sample reports with different dates and statuses');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
