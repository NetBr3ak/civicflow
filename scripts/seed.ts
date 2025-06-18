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
			createdAt: new Date('2025-10-06T09:45:00'),
		},
	});

	await prisma.report.create({
		data: {
			name: 'Emily Rodriguez',
			email: 'emily.r@email.com',
			category: 'Education',
			message: 'The local library needs more after-school programs for children. Many parents are requesting extended tutoring hours and computer access.',
			priority: 'low',
			createdAt: new Date('2025-10-05T16:20:00'),
		},
	});

	await prisma.report.create({
		data: {
			name: 'David Thompson',
			email: 'd.thompson@email.com',
			category: 'Healthcare',
			message: 'Community health clinic on 5th Street has extremely long wait times. Patients are waiting 4-5 hours for basic consultations. Additional staff urgently needed.',
			priority: 'high',
			createdAt: new Date('2025-10-04T11:00:00'),
		},
	});

	console.log('Created 5 sample reports');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
